class User{
    constructor(){
        this.user=$('.huanying');
        this.localuser=localStorage.getItem('userName');
        this.exit=$('.exit');
    }
    init(){
        this.exit.on('click',()=>{
            localStorage.removeItem("userName");
            this.user.css('visibility','hidden');
        })
        if(this.user && this.localuser){
            this.user.css('visibility','visible').find('a').html(this.localuser);
        }
    }
}

export{
    User
}