/*
 *  Copyright 2023 Unisys Corporation
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const { connect, StringCodec } = require('nats');

// Reading NATS_URI from environment variable
const servers = [{ servers: process.env.NATS_URI }];
// create a codec
const sc = StringCodec();

const { setupLogs } = require('./utils/logging');
setupLogs();
const log = require('winston');

const { attestToNotary, verifyNotary } = require('./controller/notarize');

servers.forEach(async (v) => {
  // Connect to NATS
  const nc = await connect(v);

  // Handling NATS node events
  const notarySubscriptionEvents = nc.subscribe('notary.*');
  (async (sub) => {
    log.info(`listening for ${sub.getSubject()} requests [ attest | verify ]`);
    for await (const m of sub) {
      const chunks = m.subject.split('.');
      console.info(`[notary] #${sub.getProcessed()} handling [${chunks[1]}]`);
      switch (chunks[1]) {
        case 'attest': {
          const result = await attestToNotary(sc.decode(m.data));
          m.respond(sc.encode(result));
          break;
        }
        case 'verify': {
          const result = await verifyNotary(sc.decode(m.data));
          m.respond(sc.encode(result));
          break;
        }
        default:
          m.respond(
            sc.encode(
              JSON.stringify({
                success: false,
                status: `invalid request`,
              })
            )
          );
          break;
      }
    }
  })(notarySubscriptionEvents);

  // wait for the client to close here.
  nc.closed().then((err) => {
    let m = `connection to ${nc.getServer()} closed`;
    if (err) {
      m = `${m} with an error: ${err.message}`;
    }
    log.info(m);
  });
});
