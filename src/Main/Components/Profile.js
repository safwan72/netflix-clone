import React from 'react'
import './CSS/profile.css';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import axios from 'axios';
import baseURL from "../AuthBackend/baseUrl";
import { useNavigate } from 'react-router';
import * as actions from "../Redux/actionstore";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
const mapdispatchToProps = (dispatch) => {
    return {
        getProfile: (u_id) => dispatch(actions.fetchprofile(u_id))
    }
}
const Profile = (props) => {
    const { getProfile } = props;
    const user_details = useSelector(state => state.userDetails);
    const u_id = useSelector(state => state.userId);
    const navigate = useNavigate();
    const [user_picture, setuser_picture] = React.useState(user_details?.profile_pic)
    const [show_user_picture, setshow_user_picture] = React.useState(user_details?.profile_pic)
    const { register, handleSubmit } = useForm(
        {
            defaultValues: {
                first_name: user_details?.first_name,
                last_name: user_details?.last_name,
                username: user_details?.username,
                phone: user_details?.phone,
                address: user_details?.address,
            },
        }
    );
    const header = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const onSubmit = (data) => {
        axios.patch(`${baseURL}backend/profile/${u_id}/`, data, header)
            .then(res => {
                if (res.status === 200) {
                    getProfile(u_id);
                    toast.dark("Profile Updated Successfully!!", {
                        onClose: () => navigate("/home"),
                        progressClassName: 'toast_error_class_progress'
                    })
                }

            })
            .catch(err => {
                toast.dark("Failed to Update Profile!!", {
                    onClose: () => navigate("/home"),
                    progressClassName: 'toast_error_class_progress'
                })
            })
    };

    const handlepicupdate = () => {
        if (show_user_picture !== user_details?.profile_pic) {
            const formdata = new FormData();
            formdata.append("profile_pic", user_picture);

            axios.patch(`${baseURL}backend/profile/${u_id}/`, formdata, header)
                .then(res => {
                    getProfile(u_id);
                    toast.dark("Profile Picture Updated!!", {
                        onClose: () => navigate("/home"),
                        progressClassName: 'toast_error_class_progress'
                    })
                })
                .catch(err => {
                    toast.dark("Some Problem Updating Profile Picture!! Try Again!!", {
                        onClose: () => navigate("/home"),
                        progressClassName: 'toast_error_class_progress'
                    })
                })
        }
    }

    return (
        <div className='profile__container'>
            <h1 className='profile__container__heading'>Update Profile</h1>
            <div className='profile__picture__container'>
                <div className='profile__picture'>
                    <img src={show_user_picture} alt={user_details?.user?.email} />
                    <input type="file" id='user_pic_file_input' style={{ display: 'none' }} onChange={(event) => {
                        setshow_user_picture(URL.createObjectURL(event.target.files[0]));
                        setuser_picture(event.target.files[0]);
                    }} />
                    <label htmlFor='user_pic_file_input' className='user_pic_file_input'>
                        <p style={{ marginRight: '10px' }}>Upload Picture</p>
                        <i className="fas fa-file-upload"></i>
                    </label>
                    {user_picture !== user_details?.profile_pic && <button className='user_pic_file_upload_btn' onClick={handlepicupdate}>
                        Upload
                    </button>
                    }
                </div>
                <div className='profile__email'>
                    <h2>Email: {user_details?.user?.email}</h2>
                </div>
            </div>
            <div className='profile__user_details'>
                <h3 className='profile__user__details__heading'>User Details</h3>
                <form className='profile__user__details__form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='profile__user__details__form__input_divs'>
                        <label htmlFor='first_name'>First Name</label>
                        <input type="text" id='first_name' placeholder="First Name" {...register("first_name")} />
                    </div>
                    <div className='profile__user__details__form__input_divs'>
                        <label htmlFor='last_name'>Last Name</label>
                        <input type="text" id='last_name' placeholder="Last Name" {...register("last_name")} />
                    </div>
                    <div className='profile__user__details__form__input_divs'>
                        <label htmlFor='username'>UserName</label>
                        <input type="text" id='username' placeholder="User Name" {...register("username")} />
                    </div>
                    <div className='profile__user__details__form__input_divs'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input type="number" id='phone' placeholder="Phone Number" {...register("phone")} />
                    </div>
                    <div className='profile__user__details__form__input_divs'>
                        <label htmlFor='address'>Address</label>
                        <textarea id='address' placeholder="Address" {...register("address")} rows={5} cols={5} />
                    </div>
                    <button type="submit" className='user_details_update_btn'>
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    )
}

export default connect(null, mapdispatchToProps)(Profile)
