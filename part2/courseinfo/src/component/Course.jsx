const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
const Total = (props) => {
  return <b>total of {props.parts.reduce((total, current) => total + current.exercises, 0)} exercises</b>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
    </div>
  )
}

export default Course;