class Grid {
    protected number = 0

    constructor(number: number){
        this.number = number
    }

    protected grid={
        left: '10%', 
        right: '10%',
        top: '10%',
        bottom:'10%'
    }
    getGrid() {
        return {
            show: true,
            left: this.grid.left,
            right: this.grid.right,
            top: this.grid.top,
            bottom: this.grid.bottom,
    
            containLabel: true,
    
            borderColor: 'black',
            borderWidth: 2,
        }
    }

    getXRDGrid() {
        const grid = []

        for( let i=0; i < this.number; i++ ) {
            grid.push(
                {
                    show: true,

                    left: this.grid.left,
                    right: this.grid.right,
                    top: `${i * 200 + 40}px`,
                    height: '200px',

                    borderColor: 'black',
                    borderWidth: 1,
                }
            )
        }
        return grid
    }

    getPLGrid() {
        const grid = []

        this.grid.bottom = '200px'
        grid.push(this.getGrid())

        this.grid.top = '460px'
        this.grid.bottom = '36px'
        grid.push(this.getGrid())

        return grid
    }
}

export default Grid;