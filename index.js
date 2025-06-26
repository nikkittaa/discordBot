import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import getSong from './songs.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', message =>{
    if(message.author.bot) return;
    message.reply({
        content: "Hi from Bot!",
    });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'song') {
    const song = await getSong();
    await interaction.reply(`I recommend ${song.name}!`);
  }
});



client.login(process.env.BOT_TOKEN);