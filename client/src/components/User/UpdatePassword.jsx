import React,{useState,useEffect} from 'react'
import './UpdatePassword.css'
import Loader from '../layout/loading/Loader'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,updatePassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MetData from '../layout/MetData'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import {TiTickOutline} from  'react-icons/ti'

const UpdatePassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()  
    const {error,isUpdated,loading}=useSelector((state)=>state.profile)
   
     const [oldPassword, setOldPassword] = useState("")
     const [newPassword, setNewPassword] = useState("")
     const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        myForm.set("oldPassword",oldPassword)
        myForm.set("newPassword",newPassword)
        myForm.set("confirmPassword",confirmPassword)
       dispatch(updatePassword(myForm))

    }

        useEffect(() => {
          
          if(error){
            alert.error(error)
            dispatch(clearErrors())
            
          }
          if(isUpdated){
            alert.success("Password Update Successfully")
            navigate("/account")
           dispatch({
            type:UPDATE_PASSWORD_RESET,
           })
        }
        }, [dispatch,error,alert,isUpdated])
        
  return (
    <>
    {loading ? <Loader/> :  (
        <>
        <MetData title="Change Password"/>
         <div className='updatePasswordContainer'>
          <div className='updatePasswordBox'>
           
            <div className='S1'>
            <h2 className='updatePasswordHeading' >Update Password</h2>
                <h4>Password must contain</h4>
                <div>
                    
                    <h5><TiTickOutline/> At least 8 characters</h5>
                </div>
                <div>

                    <h5><TiTickOutline/> At least 1 lowercase letter(a-z)</h5>
                </div>
                <div>

                 <h5><TiTickOutline/> At least 1 uppercase letter(A-Z)</h5>
                </div>
                <div>

                <h5><TiTickOutline/> At least 1 number(1-10)</h5>
                </div>
                
            </div>
            <div className='S2'>
          <form
           className="updatePasswordForm"
           encType="multipart/form-data"
           onSubmit={updatePasswordSubmit}
           >
        
       <div className='loginPassword'>
         <VpnKeyIcon/>
         <input type="password" 
         placeholder='Old Password'
         required
         value={oldPassword}
         onChange={(e)=>setOldPassword(e.target.value)}
         />
        </div>
        <div className='loginPassword'>
         <LockOpenIcon/>
         <input type="password" 
         placeholder='New Password'
         required
         value={newPassword}
         onChange={(e)=>setNewPassword(e.target.value)}
         />
        </div>
        <div className='loginPassword'>
         <LockIcon/>
         <input type="password" 
         placeholder='Confirm Password'
         required
         value={confirmPassword}
         onChange={(e)=>setConfirmPassword(e.target.value)}
         />
        </div>

          <div>
           <input type="submit" 
           value="Change"
           className="updatePasswordBtn"
           /> 
           </div>
           </form>
           </div>
          </div>
          </div>
        </>
   )}
   </>
  )
}

export default UpdatePassword