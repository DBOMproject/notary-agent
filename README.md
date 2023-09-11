# Notary Agent

The Notary Agent component for the Digital Bill of Materials

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Notary Agent](#notary-agent)
  - [How to Use](#how-to-use)
    - [Generate Token](#generate-token)
    - [API](#api)
    - [Configuration](#configuration)
  - [Getting Help](#getting-help)
  - [Getting Involved](#getting-involved)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to Use

### Generate Token

With npx command - run `npx sigstore token`

With Python - Install [sigstore-python](https://github.com/sigstore/sigstore-python#usage) and run `sigstore get-identity-token`

### API

[WIP] NATS Events for Notary Agent Documentation [API-SPECS repository](https://github.com/DBOMproject/api-specs/tree/2.0.0-alpha-1)

### Configuration

| Environment Variable         | Default          | Description                                 |
| ---------------------------- | ---------------- | ------------------------------------------- |
| SIGSTORE_ID_TOKEN            | `token`          | The SigStore Token                          |
| JAEGER_HOST                  |                  | The Jaeger host to send traces to           |
| JAEGER_SAMPLER_PARAM         | `1`              | The parameter to pass to the Jaeger sampler |
| JAEGER_SAMPLER_TYPE          | `const`          | The Jaeger sampler type to use              |
| JAEGER_SERVICE_NAME          | `Database Agent` | The name of the service passed to Jaeger    |
| JAEGER_AGENT_SIDECAR_ENABLED | `false`          | Is Jaeger agent sidecar injection enabled   |

## Getting Help

If you have any queries on notary-agent, feel free to reach us on any of our [communication channels](https://github.com/DBOMproject/community/blob/master/COMMUNICATION.md)

If you have questions, concerns, bug reports, etc, please file an issue in this repository's [issue tracker](https://github.com/DBOMproject/notary-agent/issues).

## Getting Involved

Find instructions on how you can contribute in [CONTRIBUTING](CONTRIBUTING.md).
