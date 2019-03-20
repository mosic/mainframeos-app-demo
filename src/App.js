import React, { Component } from 'react'
import MainframeSDK from '@mainframe/sdk'

const sdk = new MainframeSDK()
window.sdk = sdk

let dataKey = 'foo'

class App extends Component {
  state = {
    url: null,
    entries: null,
    message: null,
    dataShown: null,
    dataFetched: null,
    lastDataKey: null,
  }

  setData = async () => {
    try {
      const data = 'foo bar baz'
      console.log(dataKey, 'dataKey in setData()')
      let response = await sdk.storage.set(data, dataKey)
      console.log(response, 'response from setData()')
      this.setState({ dataShown: data, lastDataKey: dataKey })
      console.log(this, 'this')
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

  getData = async () => {
    try {
      this.setState({ lastDataKey: dataKey })
      let response = await sdk.storage.get(dataKey)
      console.log(response, 'response from getData()')
      this.setState({ dataFetched: response })
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

  uploadImage = async () => {
    try {
      let number = (Math.random() * 100 ) << 0
      // NOTE: testing the valid filename
      // const name = `dir2\\photo_${number}.jpg`
      // const name = `dir/photo_${number}.jpg`
      const name = `photo_${number}.jpg`
      console.log(name, 'name in uploadImage()')
      await sdk.storage.promptUpload(name)
      this.setState({ url: `app-file://${name}` })
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

  list = async () => {
    try {
      this.setState({message: 'loading files...'})
      const list = await sdk.storage.list()
      console.log(list, 'list')
      if (list.length === 0) {
        this.setState({ message: 'there are no files' })
      } else {
        const regex = new RegExp("image.+");
        const images = list.filter(entry => {
          return regex.test(entry.contentType)
        })
        this.setState({entries: images})
      }
    }
    catch(error) {
      console.log(error, 'error')
    }
  }

  showImage = async (entry) => {
    console.log(entry, 'entry')
    this.setState({url: `app-file://${entry.key}`})
  }

  render() {
    const { url, entries, message, dataShown, dataFetched, lastDataKey } = this.state

    return (
      <div>
        <p>{lastDataKey}</p>
        <br/>
        <button onClick={this.setData}>Set Data</button> <code>data: {dataShown}</code>
        <br/>
        <br/>
        <button onClick={this.getData}>Get Data</button> <code>data: {dataFetched}</code>
        <br/>
        <br/>
        <button onClick={this.uploadImage}>Upload Image</button>
        <br/>
        <br/>
        <button onClick={this.list}>List</button>
        <br/>
        <br/>
        {entries ? <div>
          {entries.map((entry, index) =>
            <button key={index} onClick={() => this.showImage(entry)}>{entry.key}</button>
          )}
        </div> : <p>{message}</p>}
        <br/>
        {url ? <img alt='avatar' src={url} /> : null}
      </div>
    )
  }
}

export default App
