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

### Environment Variables

SLACK_WEBHOOK_URL

OAUTH2_SECRET (from Vercel integration console)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
