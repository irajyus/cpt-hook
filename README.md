# Webhook Server Starter

A webhook server built with [express](https://www.npmjs.com/package/express) you can catch a webhook in your Node.js Backend. The specific use case in this repo is to catch a webhook body from Vercel and to send the message to a Slack incoming webhook url for posting in a channel.

## Installation

Please run the following command inside this projects directory in terminal:

```python
npm install

or

yarn install
```

## Run

To start the local server, please run:

```python
npm start

or

yarn start
```

For local development, you can use a service like e.g [ngrok](https://ngrok.com/) to expose your server to the web. Start ngrok on the same port like this server e.g. with `./ngrok http 5000` This will expose you server on a public https endpoint - as an example:

`https://739ca52d057d.ngrok.io/`

### Vercel Integration

The [webhook URL](https://vercel.com/docs/integrations/create-integration#webhook-url) must be set for the created vercel integration in the integration console. Once deployed to a hosting service, this would be the server address/url used to access the site. With express, a specific [route path](https://expressjs.com/en/guide/routing.html#route-paths), such as /vercel-events, can be defined.

When testing locally with ngrok, the url provided by ngrok must be set as the webhook url for the integration, this means that in different ngrok sessions the url would change and the integration in vercel would need to be updated prior to testing.

### Environment Variables

SLACK_WEBHOOK_URL

OAUTH2_SECRET (the Client (INTEGRATION) Secret field for the custom integration accessible from the [integration console](https://vercel.com/dashboard/integrations/console))

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
