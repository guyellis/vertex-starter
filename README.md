# vertex-starter

A starter guide and framework to working with Vertex in Node

## Installation

```
git clone git@github.com:guyellis/vertex-starter.git
cd vertex-starter
npm ci
```

## Setup GCP

- Go to the [GCP Console](https://console.cloud.google.com/) and login.
- Create a new Project.
  - In `lib/vertex.ts` set `PROJECT_ID` to the name of this project.
- Enable the `Vertex AI API` for that Project.
- [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install)

## Using this repo

Edit the `lib/prompt.txt` file and provide the prompt you want to send to Vertex.

From the root of the project run:

```
ts-node lib/vertex.ts
```

## References

[Vertex QuickStart](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/api-quickstart)
