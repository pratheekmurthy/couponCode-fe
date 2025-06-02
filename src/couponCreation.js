import React,{useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import { Button,Label,Input,Card,CardText, CardBody, CardTitle} from 'reactstrap';
import axios from 'axios'

const CouponCereation = (props)=>{
    const [state, setState] =useState({
        CouponName: "",
        typeOfDiscount: "",
        startDate: new Date(),
        endDate: new Date(),
        max_Discount: 0,
        flat_Discount_Amount: 0,
        percentage: 0,
        min_Cart_Value : 0,
      });
      const [state1,setState1] = useState({
          cartValue : 0,
          couponName : ""
      })

    const [couponsAvailable,setCouponsAvailable]= useState([])
    const [discountValue,setDiscountvalue] = useState(0)
    const [msg,setMsg]= useState("")
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };
    const handleChange1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.value });
    };

    const handleSubmit =(e)=>{
        const data ={
            CouponName : state.CouponName,
            typeOfDiscount : state.typeOfDiscount,
            startDate : state.startDate,
            endDate : state.endDate,
            max_Discount : state.max_Discount,
            flat_Discount_Amount : state.flat_Discount_Amount,
            percentage : state.percentage,
            min_Cart_Value : state.min_Cart_Value
        }

        console.log(data)
        axios.post(`http://54.87.204.39:3076/api/coupon/createCoupon`,data)
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }


    const handleSubmit1 =(e)=>{
        const data ={
            "couponID" : state1.couponName,
            "cartValue" : state1.cartValue
        }
        console.log(data)
        axios.post(`http://54.87.204.39:3076/api/coupon/checkDiscount`,data)
            .then((response)=>{
                console.log(response.data.msg)
                setMsg(response.data.msg)

                setDiscountvalue(response.data.data)
            })
            .catch((err)=>{
                console.log(err.message)
            })
    }

    useEffect(()=>{
        axios.get(`http://54.87.204.39:3076/api/coupon/getAllCoupons`)
        .then((response)=>{
            console.log(response.data.data)
            //setMsg(response.data.msg)

            setCouponsAvailable(response.data.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])

    

    return (<div>
        <Grid container spacing={2}>
        <Grid item xs={0} md={3} lg={3}>
            <h3 align="center">Coupons Available</h3>
            {
                couponsAvailable && couponsAvailable.map((ele)=>{
                    return (<div>
                        <Card>
                            <CardBody>
                                <CardText>
                                   <h4>Coupon Name : {ele.couponName}</h4>
                                   <li>createdAt : {ele.createdAt}</li>
                                   <li>start Date : {ele.startDate}</li>
                                   <li>End Date : {ele.endDate}</li>
                                   <li>Type of Discount : {ele.typeOfDiscount}</li>
                                   <li>Percentage : {ele.percentage}</li>
                                   <li>Flat Discount Amount : {ele.flat_Discount_Amount}</li>
                                   <li>Max Discount : {ele.max_Discount}</li>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>)
                })
            }
        </Grid>
        <Grid item xs={0} md={3} lg={6}>
            <Label for="exampleSelect">Enter Cart Value</Label>
            <Input type="number" onChange={handleChange1} name="cartValue" vlaue={state1.cartValue}/>
            <Label for="exampleSelect">Paste Coupon Name</Label>
            <Input type="text" onChange={handleChange1} name="couponName" vlaue={state1.couponName}/><br/>
            <Button color="primary" onClick={handleSubmit1}>Check for Discount</Button>
            <br/><br/>
            <p>{msg}</p>
            {
                discountValue > 0 && <div>
                   
                    <h1 align="center">Discount Value  -{discountValue}</h1>
                </div>
            }
            
            
        </Grid>
        <Grid item xs={0} md={4} lg={3}>
            <Card>
                <CardBody>
                <CardTitle><h3>Create Coupon</h3></CardTitle>
                    <CardText>
                        <Label for="exampleEmail">Coupon Name</Label>
                        <Input id="exampleEmail"  placeholder="eg : sunday500" type="text" onChange={handleChange} name="CouponName" vlaue={state.CouponName}/>
                        <Label for="exampleSelect">Type of Discount</Label>
                        <Input id="exampleSelect"  type="select" onChange={handleChange} name="typeOfDiscount" vlaue={state.typeOfDiscount}>
                            <option vlaue="">Select Type of Discount</option>
                            <option value="flat">Flat</option>
                            <option value="percentage">Percentage</option>
                        </Input>
                        <Label for="exampleSelect">Start Date</Label>
                        <Input type="date" onChange={handleChange} name="startDate" vlaue={state.startDate}/>
                        <Label for="exampleSelect">End Date</Label>
                        <Input type="date" onChange={handleChange} name="endDate" vlaue={state.endDate}/>
                        <Label for="exampleSelect">Max Discount Amount </Label>
                        <Input type="number" placeholder='eg : 300' onChange={handleChange} name="max_Discount" vlaue={state.max_Discount}/>
                        {
                            state.typeOfDiscount === "flat" && <div><Label for="exampleSelect">Flat Discount Amount </Label>
                            <Input type="number" placeholder='eg : 100' onChange={handleChange} name="flat_Discount_Amount" vlaue={state.flat_Discount_Amount}/></div>
                        }
                        {
                            state.typeOfDiscount === "percentage" && <div><Label for="exampleSelect">Enter percentage Discount </Label>
                            <Input type="number" placeholder='eg : 20' onChange={handleChange} name="percentage" vlaue={state.percentage}/></div>
                        }
                        
                        <Label for="exampleSelect">Enter Minimum Cart Value Required </Label>
                        <Input type="number" placeholder='eg : 20' onChange={handleChange} name="min_Cart_Value" vlaue={state.min_Cart_Value}/>
                        <br/>
                        
                        <Button  color="primary" onClick={handleSubmit}>Add Coupon</Button>
                    </CardText>
                </CardBody>
            </Card>
        </Grid>
        
        </Grid>
    </div>)
}

export default CouponCereation