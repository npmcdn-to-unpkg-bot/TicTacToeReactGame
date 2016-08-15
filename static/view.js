var App_Name = React.createClass({
  render:function(){
    return (
      <div className='app_name'>
        TIC TAC TOE GAME!
      </div>
    );
  }
});

var Room_link = React.createClass({

  propTypes: {
    data: React.PropTypes.node.isRequired
  },

  render:function(){
    return(
      <div className='room_link'>
        <p>Ссылка на комнату: 178.62.214.230:3777/?rid={this.props.data} </p>
      </div>
    );
  }
});

var Field = React.createClass({
  render:function(){
    return(
      <canvas className="Main_canvas"  id="tutorial" width="300" height="300">hello world!</canvas>
    );
  }
});

var Message = React.createClass({
  propTypes: {
    data: React.PropTypes.node.isRequired
  },
  render:function(){
    return (
      <div>
    
      </div>
    );
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      state: 'wait',
      link: null,
      msg:null
    };
  },

  componentDidMount() {
    socket.on('room_created', this._keyChange);
    socket.on('game_start', this._startGame);
    socket.on('stop_game', this._stopGame);
  },

  _startGame(){
    this.setState({state:'play'});
    game_start();
  },

  _keyChange(msg){
    var key = msg.key;
    this.setState({link:key});
  },

  _stopGame(msg){
    this.setState({msg:msg})
    console.log(msg);
  },

  render: function() {
    return (
      <div className='content'>
        <App_Name />
        {(this.state.state == 'wait' ?  <Room_link data={this.state.link} /> : <Field /> )}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
