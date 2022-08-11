import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


const data = [
    {
        testId: 1,
        testName: 'Test 1',
        desc: 'Test description 1',
        questions: [
            {
                questionName: 'Question 1',
                answers: [
                    {
                        answerName: 'Answer 1.1',
                        isTrue: false
                    },
                    {
                        answerName: 'Answer 1.2',
                        isTrue: true
                    }
                ]
            },
            {
                questionName: 'Question 2',
                answers: [
                    {
                        answerName: 'Answer 2.1',
                        isTrue: false
                    },
                    {
                        answerName: 'Answer 2.2',
                        isTrue: true
                    }
                ]
            },
            {
                questionName: 'Question 3',
                answers: [
                    {
                        answerName: 'Answer 3.1',
                        isTrue: false
                    },
                    {
                        answerName: 'Answer 3.2',
                        isTrue: true
                    }
                ]
            }
        ]
    },
    {
        testId: 2,
        testName: 'Test 2',
        desc: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at aut autem consequatur,
         consequuntur deleniti doloremque dolores ea eligendi error excepturi expedita fugiat fugit illo
         illum in laborum magni minima, minus molestiae officiis perspiciatis porro qui quibusdam quis
         reiciendis repudiandae rerum sed soluta sunt temporibus tenetur unde voluptatibus? A aut
         consequatur consequuntur dicta ea, earum error necessitatibus perferendis similique unde.
         Animi blanditiis corporis, cumque doloremque expedita laborum libero maiores nemo neque 
         repellat totam vel voluptates. Cum ea laborum pariatur porro provident quidem unde. 
         Deserunt, iusto, repellendus. Culpa dolor dolores excepturi, illo ipsa itaque,
         laudantium officia porro sequi sit unde voluptatum!*`,
        questions: [
            {
                questionName: 'Question 1',
                answers: [
                    {
                        answerName: 'Answer 1.1',
                        isTrue: false
                    },
                    {
                        answerName: 'Answer 1.2',
                        isTrue: true
                    }
                ]
            },
            {
                questionName: 'Question 2',
                answers: [
                    {
                        answerName: 'Answer 2.1',
                        isTrue: true
                    },
                    {
                        answerName: 'Answer 2.2',
                        isTrue: false
                    }
                ]
            },
            {
                questionName: 'Question 3',
                answers: [
                    {
                        answerName: 'Answer 3.1',
                        isTrue: false
                    },
                    {
                        answerName: 'Answer 3.2',
                        isTrue: true
                    }
                ]
            }
        ]
    }
];


const root = ReactDOM.createRoot(document.getElementById('root'));
class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.handleTestCardClick = this.handleTestCardClick.bind(this);
        this.handleGoHomeClick = this.handleGoHomeClick.bind(this);
        this.state = {
            testData: null
        };
    }
    handleTestCardClick(testData) {
        this.setState({
            testData: testData
        });
    }
    handleGoHomeClick() {
        this.setState({testData: null});
    }
    render() {
        return (
            this.state.testData ? <Test onGoHomeClick={this.handleGoHomeClick} data={this.state.testData}/> :
            <div>
                <h1 className="heading">Test system</h1>
                <ul className="test-list">
                    {data.map(test =>
                        <TestCard key={test.testId} data={test} onTestCardClick={this.handleTestCardClick}/>
                    )}
                </ul>
            </div>
        );
    }
}
class TestCard extends React.Component {
    constructor(props) {
        super(props);
        this.activateTest = this.activateTest.bind(this);
    }
    activateTest() {
        this.props.onTestCardClick(this.props.data);
    }
    render() {
        return (
            <li className="test-card card" onClick={this.activateTest}>
                <h2 className="card__heading">{this.props.data.testName}</h2>
                <p className="description">{this.props.data.desc}</p>

            </li>
        );
    }
}
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trueAnswersCount: 0,
            isTestCompleted: false
        };
        this.totalAnswersCount = 0;
        this.goHomeClick = this.goHomeClick.bind(this);
        this.completeTest = this.completeTest.bind(this);
    }
    goHomeClick() {
         this.props.onGoHomeClick();
    }
    completeTest() {
        const answers = Array.from(document.forms).map(i => Array.from(i.elements).findIndex(j => j.checked)),
            trueAnswers = this.props.data.questions.map(i => i.answers.findIndex(j => j.isTrue));
        let trueAnswersCount = 0;
        for (let i = 0; i < answers.length; i++) {
            this.totalAnswersCount++;
            if (answers[i] === trueAnswers[i]) {
                trueAnswersCount++;
            }
        }
        this.setState({
            trueAnswersCount: trueAnswersCount,
            isTestCompleted: true
        });
    }
    render() {
        return (
            <div className="test">
                <header className="test__header">
                    <h1 className="heading">{this.props.data.testName}</h1>
                    <button className="button button-gohome" onClick={this.goHomeClick}>Go home</button>
                </header>
                <p className="description">{this.props.data.desc}</p>
                <ul className="test__question-wrapper">
                    {this.props.data.questions.map((i, index) =>
                        <TestQuestion key={index} questionData={i} questionNumber={index}/>
                    )}
                </ul>
                <button className="button" onClick={this.completeTest} disabled={this.state.isTestCompleted}>Complete</button>
                {
                    this.state.isTestCompleted &&
                    <div className="show-score">
                        <h3>Your score: {this.state.trueAnswersCount}/{this.totalAnswersCount}</h3>
                    </div>
                }
            </div>
        );
    }
}
function TestQuestion(props) {
    return (
        <li className="test__question card">
            <h2 className="card__heading">{props.questionData.questionName}</h2>
            <form className="test__answer-wrapper">
                <ul>
                    {props.questionData.answers.map((i, index) =>
                        <TestAnswer key={index} answerData={i} answerNumber={props.questionNumber}/>
                    )}
                </ul>
            </form>
        </li>
    );
}
function TestAnswer(props) {
    return (
        <label className="test__answer">
            <input type="radio" name={'answer-'+props.answerNumber}/>
            {props.answerData.answerName}
        </label>
    );
}
root.render(
    <TestList/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();