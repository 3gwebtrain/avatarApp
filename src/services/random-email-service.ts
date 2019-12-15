let md5 = require('md5');

const RandomEmails = () => {

    let proposedAvatarHeight = 200;
    let proposedAvatarWidth = 200;

    let wrapper = document.querySelector('.wrapper');

    let viewPortHeight = wrapper.clientHeight;
    let viewPortWidth = wrapper.clientWidth;
   
    let fesableRows = Math.floor(viewPortHeight / proposedAvatarHeight) + 1;
    let fesableColumn = Math.floor(viewPortWidth / proposedAvatarWidth);

    let requiredAvatar = (fesableRows * fesableColumn) || 0;
    let randomEmails = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';

    const propGenerator = (count) => {

        for(let i=0; i < count; i++) {
            for(let i=0;i<10;i++){
                email += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            randomEmails.push({email:email+'@avalara.com'});
            email = '';
            
        }

        randomEmails.map(item => {
            item.link = `http://www.gravatar.com/avatar/${md5(item.email)}?d=identicon&s=200`;
        });

        return randomEmails;

    }

    return {
        getRandomEmails:() => propGenerator(requiredAvatar),
        setInfiniteProps:() => propGenerator(fesableColumn)
    }
   
}

export default RandomEmails;