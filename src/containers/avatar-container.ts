import './../components/avatar.component';
import RandomEmails from './../services/random-email-service';

export default class AvatarContainer extends HTMLElement {

    
    shadowObj;
    infiniteArray = [];
    imageProps = [];
    imageURL = `http://www.gravatar.com/avatar/6288f2a2679a0242771aa6cc02e85980?d=identicon&s=200`;

    constructor(){
        super();
        this.shadowObj = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {

        this.imageProps = RandomEmails().getRandomEmails();
        this.render();
        this.setStyleByRequired();
        this.infiniteScrollHandler();
    }

    handleClick(){}

    infiniteScrollHandler() {

        let wrapper = this.shadowObj.querySelector('.avatars-container');

        wrapper.addEventListener('scroll', () => {
            
            if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight) {
                this.infiniteArray = RandomEmails().setInfiniteProps();
                this.InfiniteRender();
                this.setStyleByRequired();
                this.infiniteArray = [];
                this.infiniteScrollHandler();
            }
            
        });

        window.addEventListener('resize', () => {
            this.setStyleByRequired();
        })

    }

    InfiniteRender() {
        let rows = this.infiniteArray.map((data,index) => {
            return this.getTemplate(data, index);
        });

        const avatarsContainer = this.shadowObj.querySelector('.avatars-container');
        avatarsContainer.innerHTML = avatarsContainer.innerHTML + rows.join('');
    }

    render() {

        let rows = this.imageProps.map((data,index) => {
            return this.getTemplate(data, index);
        });
        
        this.shadowObj.innerHTML = `<div class="avatars-container">${rows.join('')}</div>`;
        
    }


    getTemplate(data, index) {
        return(
            `
            <avatar-block class="avatar-block" num="${index}" link="${data.link}" email="${data.email}"></avatar-block>
            ${this.getStyle()}
            `
        )
    }

    setStyleByRequired() {

        const avatarsContainer = this.shadowObj.querySelector('.avatars-container');
        const avatarBlock = avatarsContainer.querySelector('.avatar-block');

        const avatarsContainerWidth = avatarsContainer.clientWidth;
        const avatarBlockWidth = avatarBlock.clientWidth;

        const avatarRowCout = Math.floor(avatarsContainerWidth / avatarBlockWidth);
        const emptySpace = avatarsContainerWidth - (avatarBlockWidth * avatarRowCout );
        const paddingPerAvatar = (emptySpace / (avatarRowCout+1));
        
        avatarsContainer.querySelectorAll('.avatar-block').forEach(el => {
            el.style.marginLeft = paddingPerAvatar+'px';
            el.style.marginTop = paddingPerAvatar+'px';
        });
        
    }

    getStyle() {
        return(
            `
        <style>
            .avatars-container {
                display:flex;
                flex-direction:row;
                flex-wrap: wrap;
                overflow:auto;
                height:100%;
                background:green;
            }
        </style>
        `
        )
    }

}

customElements.define('avatar-container', AvatarContainer);