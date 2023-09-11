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

const { attest, verify } = require('sigstore');
const { setupLogs } = require('../utils/logging');
setupLogs();
const log = require('winston');
require('dotenv').config();

const attestToNotary = async (payload) => {
  try {
    log.info(`received payload: ${payload}`);
    bundle = await attest(Buffer.from(payload), 'dsse_envelope');
    log.info(`successfully created bundle: ${JSON.stringify(bundle)}`);

    return JSON.stringify({
      success: true,
      result: bundle,
    });
  } catch (err) {
    log.error(`something went wrong: ${err}`);
    return JSON.stringify({
      success: false,
      status: `something went wrong: ${err}`,
    });
  }
};

const verifyNotary = async (bundle) => {
  try {
    await verify(bundle);
    log.info(`verification success`);
    return JSON.stringify({
      success: true,
      status: `verification success`,
    });
  } catch (err) {
    log.error(`something went wrong: ${err}`);
    return JSON.stringify({
      success: false,
      status: `something went wrong: ${err}`,
    });
  }
};

module.exports = {
  attestToNotary,
  verifyNotary,
};
