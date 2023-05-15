import React from "react";
import { useState } from "react";
import { StyledButton, StyledBigInput } from "../../../styles";
import { useEffect } from "react";
import axios from "axios";

function sendMSG(phone, secretXKey, errorHandler, successHandler) {
  console.log(phone, secretXKey);
  const options = {
    method: "POST",
    url: "https://wipple-sms-verify-otp.p.rapidapi.com/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": secretXKey,
      "X-RapidAPI-Host": "wipple-sms-verify-otp.p.rapidapi.com",
    },
    data: `
    {"app_name":"Domain.com","code_length":6,"code_type":"number","expiration_second":86000,"phone_number":${phone}}
    `,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      successHandler(true);
    })
    .catch(function (error) {
      errorHandler(error);
    });
}

function codeVerification(
  phone,
  code,
  secretXKey,
  errorHandler,
  successHandler
) {
  const options = {
    method: "GET",
    url: "https://wipple-sms-verify-otp.p.rapidapi.com/verify",
    params: {
      phone_number: phone,
      verification_code: code,
      app_name: "domain.com",
    },
    headers: {
      "X-RapidAPI-Key": secretXKey,
      "X-RapidAPI-Host": "wipple-sms-verify-otp.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
      successHandler(response.data);
    })
    .catch(function (error) {
      console.log(error);
      errorHandler(error);
    });
}

const StorePhone = ({ setCanContinue, data, changeHandler }) => {
  const [phone, setPhone] = useState("");
  const [codeSend, setCodeSent] = useState(false);
  const [code, setCode] = useState(false);
  const [error, setError] = useState("");

  const handelChange = (e) => {
    changeHandler(e);
    setPhone(e.target.value);
  };

  useEffect(() => {
    if (data.phone_number) setPhone(data.phone_number);
    if (data.phone_verified) setCanContinue(true);
    sendMSG(
      "0641679994",
      process.env.REACT_APP_RAPID_API_X_KEY,
      setError,
      setCodeSent
    );
  }, []);

  return (
    <div>
      <h3>Enter Your Phone Number</h3>
      <StyledBigInput
        name="phone_number"
        type="text"
        value={phone}
        onChange={handelChange}
      />
      {codeSend && (
        <>
          <h3>Verify your phone Number</h3>
          <StyledBigInput
            name="verifyCode"
            type="phone"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </>
      )}
      {/* <p>{error}</p> */}
      {!data.phone_verified ? (
        <StyledButton
          onClick={() =>
            sendMSG(
              phone,
              process.env.REACT_APP_RAPID_API_X_KEY,
              setError,
              setCodeSent
            )
          }
        >
          {codeSend ? "Varify" : "Send Code"}
        </StyledButton>
      ) : (
        "Your phone is verified"
      )}
    </div>
  );
};

export default StorePhone;
