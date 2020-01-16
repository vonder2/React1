import React from "react";

export default class CourseForm extends React.Component
{
    constructor(props) {
        super(props);
        this.courses = props.courses;
        this.onAddCourse = props.addCourseFunc;
        this.titles = props.titles;
        this.lectors = props.teachers;
        this.invalid = true;

        this.handleOnChangeId = this.onChangeIdHandler.bind(this); // copy of a function with this of this function (not from window).
        this.handleOnSelect = this.onSelectHandler.bind(this); // copy of a function with this of this function (not from window).
        this.handleOnSubmit = this.onSubmitHandler.bind(this); // copy of a function with this of this function (not from window).
        //instead of arrow functions

        this.state = {
            "id": 0,
            "title": '',
            "lecturer": '',
            "error": ''
        }
    }

    validate() {
        // if (this.state.id && this.state.title && this.state.lecturer )
            this.invalid = !(this.state.id && this.state.title && this.state.lecturer);
    }

    onChangeIdHandler(event) {
        const courseId = +event.target.value; // target is what made an event
        console.log("Courses is: ",this.courses);

        if (this.courses.find(course => course.id === courseId))
            this.setState({id: 0, error: 'Course with id ' + courseId + ' already exist!'});
        else
            this.setState({id: courseId, error: ''});
    }

    onSelectHandler(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        console.log(fieldName, fieldValue);
        this.setState({[fieldName]: fieldValue});
    }

    render() {
        this.validate();
        const titleOptions = this.titles.map(title => { return(
            <option key={title} value={title}> {title.toUpperCase()} </option>
        )});
        const lecturerOptions = this.lectors.map(lecturer => { return(
            <option key={lecturer} value={lecturer}> {lecturer.toUpperCase()} </option>
        )});

        return (
            <div className="card" style={{width: 300 + 'px'}}>
                <header className="card-header">Course data</header>
                <div className="card-body">
                    <form onSubmit={this.handleOnSubmit}>
                        <div className="form-group">
                            <label>Course ID</label>
                            <input type="number" name="id" onBlur={this.handleOnChangeId}/>
                            <div className="alert alert-danger" hidden={!this.state.error}>
                                {this.state.error}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <select className='form-control' name="title" onBlur={this.handleOnSelect}>
                                {titleOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Teacher</label>
                            <select className='form-control' name="lecturer" onBlur={this.handleOnSelect}>
                                {lecturerOptions}
                            </select>
                        </div>
                        <button className="btn" disabled={this.invalid} type={"submit"}>Add Course</button>
                    </form>
                </div>

            </div>
        );
    }

    onSubmitHandler(event) {
        event.preventDefault(); //disable get requests
        // event.target.reset();

        const course = {
            // id: this.state.id,
            title: this.state.title,
            teacher: this.state.lecturer
        }

        this.onAddCourse(course);
    }
}
