import Axios from "axios-observable";
import {map} from "rxjs/operators";

class CoursesHttpService
{

    constructor(urlCourses, urlTitles, urlTeachers) {
        this.urlCourses = urlCourses;
        this.urlTitles = urlTitles;
        this.urlTeachers = urlTeachers;
    }

    addCourse(course) {
        return Axios.post(this.urlCourses, course).pipe(map(response => response.data));
    }

    getCourse(id) {
        return Axios.get(this.urlCourses + id).pipe(map(response => response.data));
    }

    getAllCourses() {
        return Axios.get(this.urlCourses).pipe(map(response => response.data));
    }

    deleteCourse(id) {
        return Axios.delete(this.urlCourses + id).pipe(map(response => response.data));
    }


    getAllTitles() {
        return Axios.get(this.urlTitles).pipe(map(response => response.data));
    }
    getAllTeachers() {
        return Axios.get(this.urlTeachers).pipe(map(response => response.data));
    }
}
export default CoursesHttpService;
