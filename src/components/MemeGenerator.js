import React, { Component } from 'react'

export default class MemeGenerator extends Component {
    state = {
            topText: '',
            bottomText: '',
            img: 'http://i.imgflip.com/1bij.jpg',
            allMemes: []
        }
    

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemes: memes })
            })
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState(prev => {
            const randomMeme = Math.floor(Math.random() * prev.allMemes.length)
            return (
                { img: prev.allMemes[randomMeme].url }
            )
        })
    }



render() {
    return (
        <div className="meme-gen-body">
            <form className="meme-form" onSubmit={this.handleSubmit}>
                <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.BottomText} onChange={this.handleChange} />
                <button>Random Meme</button>
            </form>

            <div className="meme-area">
                <img src={this.state.img} alt="" />
                <h2 className="top-text">{this.state.topText}</h2>
                <h2 className="bottom-text">{this.state.bottomText}</h2>
            </div>
        </div>
    )
}

}