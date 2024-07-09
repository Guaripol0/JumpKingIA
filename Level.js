class Level{
    constructor() {
        this.levelImage = null;
        this.lines = [];
        this.levelNo =0;
        this.isBlizzardLevel = false;
        this.isIceLevel = false;
        this.coins = [];
        this.hasProgressionCoins = false;
        this.winCat = [];
    }

    show(){
        push();
        image(this.levelImage,0,0)
        if(showingLines){
            for(let l of lines){
                l.Show();
            }
        }
        if(showingCoins){
            for(let c of this.coins){
                c.show();
            }
        }
        if (showingCat) {
            for (let cat of this.winCat) {
                cat.Show();
            }
        }

        pop();
    }


}