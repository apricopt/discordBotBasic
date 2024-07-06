const {Client,GatewayIntentBits,EmbedBuilder,SlashCommandBuilder,Permission}= require('discord.js');
require('dotenv').config();

const client=new Client({
    intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]
});

client.on("ready", async ()=>{
    console.log("Super Drug Bot is ready");
    client.user.setActivity("Subscribe to Super Drup");

    const ping=new SlashCommandBuilder().setName('ping').setDescription('this is a pig command');
     client.application.commands.create(ping);

     const superDrug = new SlashCommandBuilder().setName('superdrug').setDescription('Super Drug commands').addSubcommand(subcommand => subcommand
                .setName('stock')
                .setDescription('Check stock on Super Drug')
                .addStringOption(option =>
                    option.setName('url')
                        .setDescription('The URL to check')
                        .setRequired(true)));
    await client.application.commands.create(superDrug);

})

client.on("interactionCreate", async (interaction)=>{
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'ping'){
        interaction.reply("this is url we got ")
    }else if (interaction.commandName === 'superdrug' && interaction.options.getSubcommand() === 'stock') {
        const url = interaction.options.getString('url');
        await interaction.reply(`I will send you data for the URL: ${url}. Please wait...`);
        const stockLevel=133
        setTimeout(() => {
            interaction.followUp(`Here is the data for the URL: ${url} and its available stock is ${stockLevel}`);
        }, 5000);
    }
})


client.login(process.env.discordToken);