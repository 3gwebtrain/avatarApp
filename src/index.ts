import "./index-style.css";
import "./containers/avatar-container"

export default class Gravatar extends HTMLElement {

    constructor(){
        super();
        this.render()
    }

    render() {
        this.innerHTML = `
        <div class="wrapper">
            <avatar-container></avatar-container>
        </div>`
    }

}

customElements.define('gravatar-images', Gravatar);