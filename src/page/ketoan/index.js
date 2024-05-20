import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from "realm-web";
import config from '../../config';
import "./index.css"

const app = new Realm.App({ id: `${config.API}` });
const user = app.currentUser;

const MyForm = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [jsonSchemaInput, setJsonSchemaInput] = useState({});
    const [jsonSchemaInput1, setJsonSchemaInput1] = useState({});
    const [jsonSchemaInput2, setJsonSchemaInput2] = useState({});
    const [jsonSchemaInput3, setJsonSchemaInput3] = useState({});
    const [jsonSchemaOutput, setJsonSchemaOutput] = useState({});
    const [formData, setFormData] = useState({});
    const [salary, setSalary] = useState({});

    const fetchDataNetSalaryModule = async () => {
        try {
            const functionName = "salaryfe_module";
            const res = await user?.callFunction(functionName);

            setJsonSchemaInput(res?.public?.input?.jsonSchema?.properties?.Salary_no_tax);
            setJsonSchemaOutput(res?.public?.output?.jsonSchema);
            setJsonSchemaInput1(res?.public?.input?.jsonSchema?.properties?.thueTNCN);
            setJsonSchemaInput2(res?.public?.input?.jsonSchema?.properties?.loan_amount);
            setJsonSchemaInput3(res?.public?.input?.jsonSchema?.properties?.baohiem);
            console.log("ress: ", res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const onSubmit = async ({ formData }) => {
        setIsLoading(true);
        // Simulate API call or processing
        try {
            await fetchData({ data: formData });
            await OutData();
            setTimeout(() => {
                // Handle form submission here
                console.log("Form data:", formData);
                setIsLoading(false);
            }, 2000); // Simulating 2 seconds delay for API call or processing
        } catch (error) {
            console.log(error.error);
            setIsLoading(false);
        }
    };
    const fetchData = async (formData) => {
        const functionName = "datasalary";
        const args = [formData, user.id]; // Truyền dữ liệu đúng định dạng
        try {
            const res = await user.callFunction(functionName, ...args);
            console.log("success: ", res);
        } catch (error) {
            console.log("err:", error.error);
        }
    }
    const OutData = async () => {
        const functionName = 'datasalary_module';
        try {
            const res = await user.callFunction(functionName);
            setSalary(res[0]?.public?.output?.jsonData?.salary_no_tax);
            console.log('success: ', res);
        } catch (error) {
            console.log('err:', error.error);
        }
    };
    //------------------------------------------------------------------------
    const [thuetncn, setThuetncn] = useState({});
    const fetchData1 = async (formData) => {
        const functionName = "datathuetncn";
        const args = [formData, user.id]; // Truyền dữ liệu đúng định dạng
        console.log("arg", args);
        try {
            const res = await user.callFunction(functionName, ...args);
            console.log("success: ", res);
        } catch (error) {
            console.log("err:", error.error);
        }
    };
    const onSubmit1 = async ({ formData }) => {
        setIsLoading(true);
        // Simulate API call or processing
        try {
            await fetchData1({ data1: formData });
            await OutData1();
            setTimeout(() => {
                // Handle form submission here
                console.log("Form data1:", formData);
                setIsLoading(false);
            }, 2000); // Simulating 2 seconds delay for API call or processing
        } catch (error) {
            console.log(error.error);
            setIsLoading(false);
        }
    };
    const OutData1 = async () => {
        const functionName = 'datathuetncn_module';
        try {
            const res = await user.callFunction(functionName);
            setThuetncn(res[0]?.public?.output?.jsonData?.thueTNCN);
            console.log('success: ', res);
        } catch (error) {
            console.log('err:', error.error);
        }
    };
    //--------------------------------------------------
    const onSubmit2 = async ({ formData }) => {
        setIsLoading(true);
        // Simulate API call or processing
        try {
            await fetchData2({ data2: formData });
            await OutData2();
            setTimeout(() => {
                // Handle form submission here
                console.log("Form data2:", formData);
                setIsLoading(false);
            }, 2000); // Simulating 2 seconds delay for API call or processing
        } catch (error) {
            console.log(error.error);
            setIsLoading(false);
        }
    }
    const fetchData2 = async (formData) => {
        const functionName = "dataloan";
        const args = [formData, user.id]; // Truyền dữ liệu đúng định dạng
        console.log("arg", args);
        try {
            const res = await user.callFunction(functionName, ...args);
            console.log("success: ", res);
        } catch (error) {
            console.log("err:", error.error);
        }
    };
    const [loan, setLoan] = useState({});
    const OutData2 = async () => {
        const functionName = 'dataloan_module';
        try {
            const res = await user.callFunction(functionName);
            setLoan(res[0].public?.output?.jsonData?.loan);
            console.log('success: ', res);
        } catch (error) {
            console.log('err:', error.error);
        }
    };
//------------------------------------------------------------------------
const onSubmit3 = async ({ formData }) => {
    setIsLoading(true);
    // Simulate API call or processing
    try {
        await fetchData3({ data3: formData });
        await OutData3();
        setTimeout(() => {
            // Handle form submission here
            console.log("Form data3:", formData);
            setIsLoading(false);
        }, 2000); // Simulating 2 seconds delay for API call or processing
    } catch (error) {
        console.log(error.error);
        setIsLoading(false);
    }
}
const fetchData3 = async (formData) => {
    const functionName = "databaohiem";
    const args = [formData, user.id]; // Truyền dữ liệu đúng định dạng
    console.log("arg", args);
    try {
        const res = await user.callFunction(functionName, ...args);
        console.log("success: ", res);
    } catch (error) {
        console.log("err:", error.error);
    }
}
const [baohiem, setBaohiem] = useState({});
const OutData3 = async () => {
    const functionName = 'databaohiem_module';
    try {
        const res = await user.callFunction(functionName);
        setBaohiem(res[0].public?.output?.jsonData?.giabaohiem);
        console.log('success: ', res);
    } catch (error) {
        console.log('err:', error.error);
    }
}


    useEffect(() => {
        fetchDataNetSalaryModule();
    }, []);


    return (
        <div className="container">
            <h1 className="text-center">Form</h1>
            {jsonSchemaInput && jsonSchemaInput1 && jsonSchemaInput2 ? (
                <>
                    <Form
                        className="custom-form"
                        schema={jsonSchemaInput}
                        validator={validator}
                        formData={formData}
                        onSubmit={onSubmit}
                    />
                    <Form
                        className="custom-form"
                        schema={jsonSchemaInput1}
                        validator={validator}
                        formData={formData}
                        onSubmit={onSubmit1}
                    />
                    <Form
                        className="custom-form"
                        schema={jsonSchemaInput2}
                        validator={validator}
                        formData={formData}
                        onSubmit={onSubmit2}
                    />
                    <Form
                        className="custom-form"
                        schema={jsonSchemaInput3}
                        validator={validator}
                        formData={formData}
                        onSubmit={onSubmit3}
                    />
                </>
            ) : (
                <div>Không có jsonSchemaCalculateNetSalaryInput</div>
            )}
            <h2 className="text-center">Output: </h2>
            {jsonSchemaOutput ? (
                <>
                <Form
                    className="custom-form"
                    schema={jsonSchemaOutput}
                    validator={validator}
                    formData={{Salary_no_tax: salary, thueTNCN: thuetncn, loan_amount: loan, Thành_tiền_BH: baohiem}}
                />
                </>
                
            ) : (
                <div>Không có jsonSchemaCalculateNetSalaryOutput</div>
            )}
        </div>
    );

};

export default MyForm;
