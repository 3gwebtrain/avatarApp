
class Avatar extends HTMLElement {

    shadowObj;
    turn = false;

    constructor(){
        super();

        this.shadowObj = this.attachShadow({mode: 'open'});
        this.render();
    }

    connectedCallback(){

        const avatarShell = this.shadowObj.querySelector('.avatar-shell');

        avatarShell.addEventListener('click', (e) => {  
            const parentShadowRoot = this.shadowRoot.host.parentElement;
            const childrenHolders = parentShadowRoot.querySelectorAll('avatar-block');
            childrenHolders.forEach(holder => {
                holder.shadowRoot.querySelector('.avatar-shell').classList.remove('active');
            })
            avatarShell.classList.add('active');
        });
    }

    render(){
        this.shadowObj.innerHTML = this.getTemplate();   
    }

    getTemplate() {
        return (
            `
            <div class="avatar-holder">
                <div class="avatar-shell">
                    <div class='avatar-front'><image src="${this.getAttribute('link')}" /></div>
                    <div class='avatar-back'>${this.getAttribute('email')}</div>
                </div>
            </div>

            ${this.getStyle()}
            `
        )
    }

    getStyle() {
        return (
            `
            <style>
                .avatar-holder {
                    border:1px solid gray;
                    cursor:pointer;
                    background-color: transparent;
                    border: 1px solid #f1f1f1;
                    perspective: 1000px;
                    overflow:hidden;
                    width:200px;
                    height:200px;
                    box-sizing:border-box;
                }
                

                .avatar-shell {
                    position:relative;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                    width: 100%;
                    height: 100%;
                }

                .avatar-shell.active {
                    transform: rotateY(180deg);
                }

                .avatar-font, .avatar-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    left:0; top:0;
                }

                .avatar-front img {
                    width:100%;
                }

                .avatar-back {
                    text-align:center;
                    background:#fff;
                    color: black;
                    transform: rotateY(180deg);
                    display:flex;
                    align-items:center;
                }
            </style>

            `
        )
    }

}

customElements.define('avatar-block', Avatar);