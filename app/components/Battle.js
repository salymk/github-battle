import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { ThemeConsumer } from '../contexts/theme'
import {Link} from 'react-router-dom'

function Intructions() {
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="intructions-container">
                    <h1 className="center-text header-lg">Intructions</h1>
                    <ol className="container-sm grid center-text battle-instructions">
                        <li>
                            <h3 className="header-sm">Enter two Github users</h3>
                            <FaUserFriends className={`bg-${theme}`} color="rgb(255, 191, 116)" size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">Battle</h3>
                            <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">See the winners</h3>
                            <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={140} />
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}

class PlayerInput extends React.Component {
    state={
        username: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    handleChange = () => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <ThemeConsumer>
                {({theme}) => (
                <form className="column player" onSubmit={this.handleSubmit}>
                    <label className="player-label" htmlFor="username">{this.props.label}</label>

                    <div className="row player-inputs">
                        <input type="text" className={`input-${theme}`} id="username" placeholder="github username" autoComplete="off" value={this.state.username} onChange={this.handleChange} />
                        <button type='submit' className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`} disabled={!this.state.username}>
                            Submit
                        </button>
                    </div>
                </form>
                )}
            </ThemeConsumer>
        )
    }
}

PlayerInput.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

function PlayerPreview({username, onReset, label}) {
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="column player">
                    <h3 className="player-label">{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className="player-info">
                            <img src={`https://github.com/${username}.png?size=200`} alt={`Avatar for ${username}`} className="avatar-small" />
                            <a href={`https://github.com/${username}`} className="link">{username}</a>
                        </div>
                        <button className="btn-clear flex-center" onClick={onReset}>
                            <FaTimesCircle color='rgb(194, 57, 42)' size={26}/>
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}



export default class Battle extends React.Component {
    state = {
        playerOne: null,
        playerTwo: null
    }

    handleSubmit = (id, player) => {
        this.setState({
            [id]: player
        })
    }

    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }

    render() {
        const {playerOne, playerTwo} = this.state

        return (
            <React.Fragment>
                <Intructions />

                <div className="players-container">
                    <h1 className="center-text header-lg">Players</h1>
                    <div className="row space-around">
                        {playerOne === null ? 
                            <PlayerInput 
                                label="Player One"
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}
                            />
                            : <PlayerPreview
                                username={playerOne}
                                label='Player One'
                                onReset={() => this.handleReset('playerOne')}
                            />
                        }

                        {playerTwo === null ? 
                            <PlayerInput 
                                label="Player Two"
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                            />
                            : <PlayerPreview
                                username={playerTwo}
                                label='Player Two'
                                onReset={() => this.handleReset('playerTwo')}
                            />
                        }
                    </div>

                    {playerOne && playerTwo && (
                        <Link 
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }} 
                            className="btn dark-btn btn-space" >
                            Battle
                        </Link>
                    )}
                </div>
            </React.Fragment>
        )
    }
}