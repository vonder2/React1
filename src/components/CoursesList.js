import './CoursesList.css';
import React from "react";

class CoursesList extends React.Component
{

    constructor(props) {
        super(props);
        this.titles = [];
        this.teachers = [];
        this.courseService = props.courseService;
        if (!this.courseService) throw new Error('!no Course Service provided!');

        this.state = {courses: []};
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
        this.courseService.deleteCourse(id).subscribe(() => {
            this.refresh();
        });
    }

    onCourseAdd(id) {
        this.courseService.addCourse(id).subscribe(() => {
            this.refresh();
        });
    }

    refresh() {
        if (this.subscriptionCourses.closed)
            this.courseService.getAllCourses().subscribe(
                courses => this.setState({courses}));
    }

    render() {
        const courseRecords = this.state.courses.map( course => {
            return (
                <tr>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.teacher}</td>
                    <td>
                        <i className={"fa fa-trash"} onClick={this.onCourseDelete.bind(this, course.id)}></i>
                    </td>
                </tr>
            )
        });

        const addCourseBtn = <button className={"btn"} onClick={this.onCourseAdd.bind(this)}>Add New</button>;

        return (
            {addCourseBtn},
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Teacher</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                    {courseRecords}
                </tbody>
            </table>
        )
    }
}
export default CoursesList;
