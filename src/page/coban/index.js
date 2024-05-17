import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from "realm-web";
import config from '../../config';
import "./index.css"
import { type } from '@testing-library/user-event/dist/type';

const app = new Realm.App({ id: `${config.API}` });
const user = app.currentUser;
const schema = {
    type: "object",
    properties: {
        Input: {
            type: "object",
            properties: {
                Thông_tin_nhân_viên: {
                    type: "object",
                    properties: {
                        Name: {
                            type: "string"
                        },
                        ID: {
                            type: "number"
                        }
                    },
                    required: [
                        "Name",
                        "ID"
                    ]
                },
                Part: {
                    type: "object",
                    properties: {
                        Part: {
                            type: "string",
                            enum: [
                                "Teaching Department",
                                "Technical Department",
                                "HR Department",
                                "Production Department",
                                "Supervision Department",
                                "CEO",
                                "R&D",
                                "CFO"
                            ]
                        },
                        Lương_cơ_bản: {
                            type: "number",
                            title: "Lương cơ bản"
                        }
                    },
                    required: [
                        "Part",
                        "Lương_cơ_bản"
                    ],
                    title: "Bộ phận"
                },
                Plan: {
                    type: "object",
                    properties: {
                        Chỉ_tiêu: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    Tên_chỉ_tiêu: {
                                        type: "string",
                                        title: "Tên chỉ tiêu"
                                    },
                                    Số_tiền: {
                                        type: "number"
                                    }
                                },
                                required: [
                                    "Tên_chỉ_tiêu",
                                    "Số_tiền"
                                ]
                            },
                            title: "Chỉ tiêu"
                        }
                    },
                    required: [
                        "Chỉ_tiêu"
                    ]
                },
                Budget_performance: {
                    type: "number",
                    title: "Balance",
                    description: "Nếu đạt trên 55% plan thì đánh giá là complete, mức lương từ 0-54% ứng với hệ số 0, mức lương từ 55-70% tính hệ số 0.6, mức lương từ 71-90% tính tương ứng với hệ số 0.8, mức lương từ 91-100% tính hệ số 1.1"
                },
                Bonus: {
                    type: "number",
                    title: "Tiền thưởng",
                    description: "Nhập số tiền thưởng."
                }
            },
            required: [
                "Thông_tin_nhân_viên",
                "Part",
                "Plan",
                "Budget_performance",
                "Bonus"
            ]
        },
        Datetime: {
            type: "string",
            format: "date-time"
        },
    },
    required: [
        "Input",
        "Datetime"
    ],
    title: "--Lương chưa thuế--"
};
const schema1 = {
    type: "object",
    properties: {
        Input: {
            type: "object",
            properties: {
                Datetime: {
                    type: "string",
                    format: "date-time"
                },
                Tên_nhân_viên: {
                    type: "string",
                    title: "Họ và tên"
                },
                ID: {
                    type: "number"
                },
                Lương_chưa_thuế: {
                    type: "number",
                    default: "0",
                    title: "Lương chưa thuế"
                },
                Hệ_số: {
                    type: "string",
                    enum: [
                        "TN*5%",
                        "TN*10%-0.25 triệu VND",
                        "TN*15%-0.75 triệu VND",
                        "TN*20%-1.65 triệu VND",
                        "TN*25%-3.25 triệu VND",
                        "TN*30%-5.85 triệu VND",
                        "TN*35%-9.85 triệu VND"
                    ],
                    default: "0",
                    title: "Chọn bậc"
                },
                "Giảm trừ bản thân": {
                    type: "number",
                    default: "0"
                },
                Bảo_hiểm: {
                    type: "number",
                    title: "Tiền đóng bảo hiểm"
                }
            },
            title: "Input"
        },
    },
    title: "--Thuế TNCN--"
}
const schema2 =
{
    type: "object",
    properties: {
        Input: {
            type: "object",
            properties: {
                Loan_type: {
                    type: "string",
                    title: "Loan type",
                    enum: [
                        "Planning",
                        "Item"
                    ]
                },
                Name: {
                    type: "string",
                    title: "Tên nhân viên"
                },
                Datetime: {
                    type: "string",
                    format: "date-time",
                    description: "Thời gian đăng ký vay mượn"
                },
                Expired_days: {
                    type: "string",
                    format: "date-time",
                    description: "Ngày hết hạn"
                },
                Value: {
                    type: "number",
                    title: "Số tiền",
                    description: "Nhập số tiền",
                    minimum: 1000000,
                    maximum: 10000000
                },
                Hệ_số: {
                    type: "string",
                    enum: [
                        "5%",
                        "10%-1-2 triệu VND",
                        "15%-3-4 triệu VND",
                        "20%-5-6 triệu VND",
                        "25%-7-8 triệu VND",
                        "30%-9-10 triệu VND",
                    ],
                    default: "0",
                    title: "Chọn bậc"
                },
                Refund_date: {
                    type: "string",
                    format: "date-time",
                    description: "Ngày hoàn trả"
                }
            },
            title: "Loans",
            required: [
                "Loan_type",
                "Name",
                "Datetime",
                "Expired_days",
                "Value",
                "Hệ_số",
                "Refund_date"
            ]
        }
    },
    title: "--Loans--",
    required: [
        "Input",
    ]
}
const schema3 = {
    type: "object",
    properties: {
      Input: {
        type: "object",
        properties: {
          BHXH: {
            "type": "number",
            "description": "8%"
          },
          BHTN: {
            "type": "number",
            "description": "1%"
          },
          BHYT: {
            "type": "number",
            "description": "1.5%"
          },
          Lương_đóng_bảo_hiểm: {
            type: "number",
            description: "Nhập lương đóng bảo hiểm",
            default: 0,
            title: "Lương đóng bảo hiểm"
          }
        },
        title: "Bảo hiểm",
        required: ["BHXH", "BHTN", "BHYT", "Lương_đóng_bảo_hiểm"]
      },
    },
    title: "--Bảo hiểm--",
    required: ["Input"]

  }
  
const schema_output = {
    type: "object",
    properties: {
        Salary_no_tax: {
            type: "number",
            description: "Lương chưa thuế = Lương cơ bản + Sum(số tiền_KPI)*Balance + Bonus",
            title: "Lương chưa thuế",
            readOnly: true,
            default: 0
        },
        Thuế_TNCN: {
            type: "number",
            description: "Thuế TNCN = (Lương chưa thuế - tiền đóng bảo hiểm - giảm trừ bản thân)*hệ số",
            readOnly: true,
            default: 0
        },
        Loan_amount: {
            type: "number",
            description: "Loan_amount = Value * hệ số",
            readOnly: true,
            default: 0
        },
        Thành_tiền_BH: {
            type: "number",
            description: "Thành tiền = (Tỷ_lệ_BHXH + Tỷ_lệ_BHTN + Tỷ_lệ_BHYT)*Lương đóng bảo hiểm",
            readOnly: true,
            default: 0
          }
    },
    required: ["Salary_no_tax", "Thuế_TNCN", "Loan_amount", "Thành_tiền_BH"],
    title: "Output"
};
const uiSchema = {
    // Định nghĩa giao diện của form ở đây
    "ui:options": {
        includeSubmitButton: false // Ẩn nút Submit
    }
};


const MyForm = () => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [salary, setSalary] = useState({});

    const [thuetncn, setThuetncn] = useState({});

    const onSubmit = async ({ formData }) => {
        setIsLoading(true);
        // Simulate API call or processing
        try {
            await fetchData({ data: formData, schema: schema });
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
    };
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
//--------------------------------------------------    
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
//--------------------------------------------------------------
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
//--------------------------------------------------------------    
    return (
        <div className="container">
            <h1 className="text-center">Form</h1>
            <Form
                schema={schema}
                formData={formData}
                onSubmit={onSubmit}
                validator={validator}
                className="custom-form"
            />
            {isLoading && <p>Loading...</p>}
            <Form
                schema={schema1}
                formData={formData}
                onSubmit={onSubmit1}
                validator={validator}
                className="custom-form"
            />
            {isLoading && <p>Loading...</p>}
            <Form
                schema={schema2}
                formData={formData}
                onSubmit={onSubmit2}
                validator={validator}
                className="custom-form"
            />
            <Form
                schema={schema3}
                formData={formData}
                onSubmit={onSubmit3}
                validator={validator}
                className="custom-form"
            />
            {isLoading && <p>Loading...</p>}
            <h2 className="text-center">Output</h2>
            <Form
                schema={schema_output}
                formData={{ Salary_no_tax: salary, Thuế_TNCN: thuetncn, Loan_amount: loan, Thành_tiền_BH: baohiem }}
                validator={validator}
                uiSchema={uiSchema}
                className="custom-form"
            />

        </div>
    );
};

export default MyForm;
