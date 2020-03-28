import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css'
import { IoIosClose, IoMdListBox } from "react-icons/io";
import Loader from 'react-loader-spinner';
import {setTitle} from "../../tools/set-title";
import snowWorkerScript from "./snow-worker";

class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            nameClassName: 'contact-form-name',
            emailClassName: 'contact-form-email',
            messageClassName: 'contact-form-message',
            loading: false,
            response: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.nameDefault = 'Your name please';
        this.emailDefault = 'Your Email please';
        this.messageDefault = 'Wanna say something?';
    }
    handleSubmit(e) {
        let err = 0;
        // Error handler
        e.preventDefault();
        this.setState({
            nameClassName: 'contact-form-name',
            emailClassName: 'contact-form-email',
            messageClassName: 'contact-form-message'
        });
        if (this.state.name.match(/^\s*$/) || this.state.name === this.nameDefault) {
            this.setState({
                name: this.nameDefault,
                nameClassName: 'contact-form-name contact-form-error',
            });
            err++;
        }
        if (this.state.email.match(/^\s*$/) || this.state.email === this.emailDefault) {
            this.setState({
                email: this.emailDefault,
                emailClassName: 'contact-form-email contact-form-error',
            });
            err++;
        } else if (this.state.email.indexOf('@') === -1) {
            this.setState({
                email: 'Email invalid',
                emailClassName: 'contact-form-email contact-form-error',
            });
            err++;
        }
        if (this.state.message.match(/^\s*$/) || this.state.message === this.messageDefault) {
            this.setState({
                message: this.messageDefault,
                messageClassName: 'contact-form-message contact-form-error',
            });
            err++;
        }

        const data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        };
        if(err === 0) {
            this.setState({
                loading: true,
                response: ''
            });
            fetch('/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error(res.status);
                    }
                }).then(json => {
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            response: json.response,
                        });
                    }, 1000 + Math.random() * 2000);
                })
                .catch(error => {
                    this.setState({
                        response: 'Oops ' + error + ', please try again.',
                        loading: false
                    })
                });
        }
    }
    handleFocus(e) {
        if (e.target.value === this.nameDefault) {
            this.setState({
                name: ''
            })
        }
        if (e.target.value === this.emailDefault) {
            this.setState({
                email: ''
            })
        }
        if (e.target.value === this.messageDefault) {
            this.setState({
                message: ''
            })
        }
    }
    handleBlur(e) {
        if (e.target.value.match(/^\s*$/) && e.target.name === 'name') {
            this.setState({
                name: this.nameDefault
            })
        }
        if (e.target.value.match(/^\s*$/) && e.target.name === 'email') {
            this.setState({
                email: this.emailDefault
            })
        }if (e.target.value.match(/^\s*$/) && e.target.name === 'message') {
            this.setState({
                message: this.messageDefault
            })
        }
    }
    handleChange(e) {
        if (e.target.name === 'name') {
            this.setState({name: e.target.value});
        }
        if (e.target.name === 'email') {
            this.setState({email: e.target.value});
        }
        if (e.target.name === 'message') {
            this.setState({message: e.target.value});
        }
    }
    handlers() {
        return {
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
        }
    }
    letItSnow() {
        if (!window.Worker) return;

        let display = document.getElementById('display');
        let ctx = display.getContext('2d');
        let width = display.width = window.innerWidth;
        let height = display.height = window.innerHeight;

        let frames = [[]];
        let isWorkerWorking = false;
        let isAnimating = false;

        const drawSnowFlake = (snowFlakeObj) => {
            ctx.beginPath();
            ctx.arc(snowFlakeObj.x, snowFlakeObj.y, snowFlakeObj.radius, 0, 2*Math.PI); // x, y, r, startAngle, endAngle
            ctx.fillStyle = '#fff';
            ctx.fill();
        };

        const getMessagePostToWorker = () => {
            return {snowFlakes: frames[frames.length - 1], width, height}
        };

        const snowWorker = new Worker(snowWorkerScript);
        snowWorker.onmessage = function(e) {
            frames = frames.concat(e.data);
            isWorkerWorking = false;
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(frame);
            }
        };
        snowWorker.onerror = function(e) {
            console.log(e.message)
        };
        snowWorker.postMessage(getMessagePostToWorker());
        function frame() {
            ctx.clearRect(0, 0, width, height);
            frames[0].forEach(obj => drawSnowFlake(obj));
            frames.shift();
            if (frames.length < 600 && !isWorkerWorking) {
                isWorkerWorking = true;
                snowWorker.postMessage(getMessagePostToWorker())
            }
            requestAnimationFrame(frame);
        }
    }

    componentDidMount() {
        setTitle('Contact me', false);
        // if (window.innerWidth > 800) this.letItSnow();
        this.letItSnow();
        this.setState({
            name: this.nameDefault,
            email: this.emailDefault,
            message: this.messageDefault
        });
    }

    render() {
        const loading = this.state.loading ? <Loader type="Bars" color="white" height={20} width={20} /> : null;
        const response = this.state.response !== '' ? <p>{ this.state.response }</p> : null;
        const button = this.state.loading ?
            <button disabled={true} style={{opacity: 0.5, cursor: 'progress'}}>Submit</button>:
            <button>Submit</button>;
        return(
            <div className='contact-wrapper'>
                <canvas id='display' width='1' height='1' />
                <Link to='/home'>
                    <div className='contact-close-icon'>
                        <IoIosClose size='4em'/>
                    </div>
                </Link>
                <form className='contact-form' onSubmit={this.handleSubmit} >
                    <div className='contact-form-icon'><IoMdListBox size='3em' /></div>
                    <input className={this.state.nameClassName} value={this.state.name} name='name' id='contact-form-name' type='text' {...this.handlers()} />
                    <input className={this.state.emailClassName} value={this.state.email} name='email' id='contact-form-email' type='email' {...this.handlers()}/>
                    <textarea className={this.state.messageClassName} value={this.state.message} name='message' id='contact-form-message' {...this.handlers()}/>
                    { button }
                    { loading }
                    { response }
                    <label htmlFor={'contact-form-name'}>name: </label>
                    <label htmlFor={'contact-form-email'}>email: </label>
                    <label htmlFor={'contact-form-message'}>message: </label>
                </form>
            </div>
        )
    }
}

export { Contact as default };