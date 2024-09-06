// import { specificUserValidation } from "../../helper/constant";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../container/Loading";
import { Form, Formik } from "formik";
// import { setLoading } from "../../store/slice/BaseSlice";
import { successToast } from "../../helper/toast";
import { handleCatchResponse } from "../../helper/helper";
// import { dataService } from "../../config/DataService";
// import { api } from "../../config/Api";
// import { AxiosError } from "axios";
import { setLoading } from "../../store/slice/Base";
import { API } from "../../axios/api";
import Modal from "./modal";
import dataService from "../../axios/dataService";
import { validateRating } from "../../helper/validation";

const RatingModal = ({ isOpen, handleCancel, recipeId }) => {
    const loading = useSelector((state) => state.base.loading);
    const dispatch = useDispatch();

    const onSubmit = async (values, { resetForm }) => {
        try {
            dispatch(setLoading(true));

            const payload = {
                rating: values.rating,
                comment: values.comment,
                recipeId
            };

            const response = await dataService.post(API.addRating, payload);

            handleCancel();
            successToast(response.data?.message);
        } catch (error) {
            console.log("error ", error);

            handleCatchResponse(error);
        } finally {
            resetForm();
            dispatch(setLoading(false));
        }
    };

    return (
        <Modal isOpen={isOpen}>
            <>
                {loading ? (
                    <Loading forTable={false} />
                ) : (
                    <div className="p-5 text-center">
                        <Formik
                            initialValues={{
                                rating: "",
                                comment: "",
                            }}
                            validationSchema={validateRating}
                            onSubmit={onSubmit}
                        >
                            {({ handleChange, handleBlur, values, errors, touched, dirty }) => (
                                <Form style={{ textAlign: "left" }}>
                                    <h1 className="text-left font-bold">Add Rating</h1>
                                    <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label htmlFor="rating" className="form-label">
                                                Rating
                                            </label>
                                            <input
                                                id="rating"
                                                name="rating"
                                                type="number"
                                                onChange={handleChange}
                                                value={values.rating}
                                                onBlur={handleBlur}
                                                className={`form-control ${errors.rating && touched.rating && "border-danger"}`}
                                                placeholder="Enter your rating"
                                            />
                                            {errors.rating && touched.rating && <div className="text-danger">{errors.rating}</div>}
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label htmlFor="comment" className="form-label">
                                                comment
                                            </label>
                                            <input
                                                id="comment"
                                                name="comment"
                                                type="text"
                                                onChange={handleChange}
                                                value={values.comment}
                                                onBlur={handleBlur}
                                                className={`form-control ${errors.comment && touched.comment && "border-danger"}`}
                                                placeholder="Enter your comment title here"
                                            />
                                            {errors.comment && touched.comment && (
                                                <div className="text-danger">{errors.comment}</div>
                                            )}
                                        </div>
                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                            <button className="btn btn-secondary w-24" type="reset" onClick={handleCancel}>
                                                cancel
                                            </button>
                                            <button className="btn btn-primary w-24 ml-2" type="submit" disabled={loading || !dirty}>
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </>
        </Modal>
    );
};

export default RatingModal;
