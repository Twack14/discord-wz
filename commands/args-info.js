module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    args: true,
    execute(message, args) {
        if (args[0] === 'foo' && args[1] === 'stats') {
			return message.channel.send('bar');
		}

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};