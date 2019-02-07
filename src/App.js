import React, { Component } from 'react'
import MainframeSDK from '@mainframe/sdk'

const sdk = new MainframeSDK()
window.sdk = sdk

class App extends Component {
  state = {
    url: null,
  }
  uploadImage = async () => {
    try {
      let number = (Math.random() * 100 ) << 0
      const name = `avatar_${number}.jpg`
      console.log(name, 'name')
      await sdk.storage.promptUpload({name: name})
      this.setState({url: `app-file://${name}`})
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

  list = async () => {
    try {
      const list = await sdk.storage.list()
      console.log(list, 'list')
    }
    catch(error) {
      console.log(error, 'error')
    }
 }

  render() {
    const { url } = this.state

    return (
      <div>
        <button onClick={this.uploadImage}>Upload Image</button>
        <br/>
        <br/>
        <button onClick={this.list}>List</button>
        <br/>
        {url ? <img alt='avatar' src={url} /> : null}
      </div>
    )
  }
}

export default App
