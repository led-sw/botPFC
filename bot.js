const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});

const loseWeight = 26;
const normalWeight = 33;
const gainWeight = 40;

bot.on('message', msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const textStart = 'Для начала расчета выберите интересующий рацион: /lose для снижения веса; /normal для поддержания веса; /gain для набора веса. Отправьте боту одну из предложенных комманд или текст "Снижение", "Поддержание", "Набор" и следуйте инструкции.';
    const textWeight = 'Пожалуйста, укажите Ваш текущий вес. (напр. 100)';
    const textDietType = 'Выбран рацион для';


    //Start
    if (text === '/start') {
        bot.sendMessage(chatId, textStart);
    };
    //Get Plan
    if (text === '/lose' || text === 'Снижение' || text === 'снижение') {
        bot.sendMessage(chatId, `${textDietType} снижения веса. ${textWeight}`);
        return text, selectPlan = loseWeight;
    };

    if (text === '/normal' || text === 'Поддержание' || text === 'поддержание') {
        bot.sendMessage(chatId, `${textDietType} поддержания веса. ${textWeight}`);
        return text, selectPlan = normalWeight;
    };

    if (text === '/gain' || text === 'Набор' || text === 'набор') {
        bot.sendMessage(chatId, `${textDietType} набора веса. ${textWeight}`);
        return text, electPlan = gainWeight;
    };

    //Get Weight
    let weight = text;
    //Get Cal
    let dailyCal = (weight *= selectPlan);

    //Math Cal function
    let dietCal = (dailyCal, ballance) => ((dailyCal * ballance) / 100);

    let proteinsCal = dietCal(dailyCal, 30);
    let fatsCal = dietCal(dailyCal, 10);
    let carbohydratesCal = dietCal(dailyCal, 60);

    //Math Mass function
    let dietMass = (dietCal, mass) => (dietCal / mass);

    let proteinsMass = dietMass(proteinsCal, 4);
    let fatsMass = dietMass(fatsCal, 9);
    let carbohydratesMass = dietMass(carbohydratesCal, 4);

    //Send Diet
    let textDiet = `
Потребляйте не более ${Math.ceil(dailyCal)} ккал. в день.

Баланс в рационе:

Белки: ${Math.ceil(proteinsCal)} ккал. или ${Math.ceil(proteinsMass)} гр. в день
Жиры: ${Math.ceil(fatsCal)} ккал. или ${Math.ceil(fatsMass)} гр. в день
Углеводы: ${Math.ceil(carbohydratesCal)} ккал. или ${Math.ceil(carbohydratesMass)} гр. в день

Обратите внимание, масса рекомендуемого рациона НЕ является массой конечного продукта!    
`;
    bot.sendMessage(chatId, textDiet);
});

