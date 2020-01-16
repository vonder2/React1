import './CoursesList.css';
import React from "react";
import CourseForm from "./CourseForm";

class CoursesList extends React.Component
{

    constructor(props) {
        super(props);
        this.titles = [];
        this.teachers = [];
        this.state = {courses: [], isFormShown: false};

        this.courseService = props.courseService;
        if (!this.courseService) throw new Error('!no Course Service provided!');
    }



    //ngOnInit
    componentDidMount() {
        this.subscriptionCourses = this.courseService.getAllCourses().subscribe(
            courses => this.setState({courses}));

        this.subscriptionTitles = this.courseService.getAllTitles().subscribe(
            titles => this.titles = titles);

        this.subscriptionTeachers = this.courseService.getAllTeachers().subscribe(
            teachers => this.teachers = teachers);
    }

    componentWillUnmount() {
        if (!this.subscriptionCourses.closed)
            this.subscriptionCourses.unsubscribe();

        if (!this.subscriptionTeachers.closed)
            this.subscriptionTeachers.unsubscribe();

        if (!this.subscriptionTitles.closed)
            this.subscriptionTitles.unsubscribe();
    }

    onCourseDelete(id) {
        if (window.confirm("Are you sure that you want to delete course with id: "+ id ))
            this.courseService.deleteCourse(id).subscribe(() => {
                this.refresh();
        });
    }

    addCourseFunc(id) {
        this.courseService.addCourse(id).subscribe(() => {
            this.refresh();
        });
        this.setState({isFormShown: false});
    }

    showForm()
    {
        this.setState({isFormShown: true});
    }

    refresh() {
        if (this.subscriptionCourses.closed)
            this.courseService.getAllCourses().subscribe(
                courses => this.setState({courses}));
    }

    render() {
        const courseRecords = this.state.courses.map( course => {
            return (
                <tr key={course.id}>

                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.teacher}</td>
                    <td className="remove">
                        <i className={"fa fa-trash"} onClick={this.onCourseDelete.bind(this, course.id)}></i>
                    </td>
                </tr>
            )
        });

        const addCourseBtn = <button className={"btn btn-primary"} onClick={this.showForm.bind(this)}>Add New Course</button>;

        if (this.state.isFormShown)
            return (
                <CourseForm titles={this.titles} teachers={this.teachers} courses={this.state.courses} addCourseFunc={this.addCourseFunc.bind(this)}/>
            );

        return (
            <div>{addCourseBtn}
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Teacher</th>
                        <th className="remove">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                        {courseRecords}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CoursesList;
