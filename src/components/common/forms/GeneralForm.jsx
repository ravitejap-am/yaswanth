import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Form, Checkbox, InputNumber, Switch, DatePicker, Select } from 'antd';
import Document from '../upload/file/Document';
import Button from '../buttons/GeneralButton';
import Input from '../input/Input';
import Dropdown from '.././dropDown/dropDown';
import { LockFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

// const { TextArea } = Input;

const GeneralForm = (props) => {
  const {
    submitHandler,
    cancelHandler,
    formElements,
    submitButtonProperty,
    cancelButtonProperty,
    isSubmit,
    isCancel,
    formType,
    forgorPasswordHandler,
    validateEmail,
    setFileSysytem,
    grid,
    buttonLoading = false,
    isReset = false,
    isSuperAdmin = false,
    orgInfo = {},
    isActiveSave = false,
  } = props;
  console.log(props);
  const [form] = Form.useForm();
  const [data, setData] = useState('hi');
  const [Errors, setErrors] = useState([]);

  useEffect(() => {
    if (isReset) {
      form.resetFields();
    }
  }, [isReset, form]);

  useEffect(() => {
    if (isSuperAdmin) {
      if (orgInfo.screen == 'personalinformation') {
        console.log('formdata', orgInfo?.orgData, 'grid', grid);

        form.setFieldsValue(orgInfo?.orgData?.address);
        form.setFieldsValue({ name: orgInfo?.orgData?.name });
      } else {
        form.setFieldsValue(orgInfo?.orgData?.contact);
      }
    }
  }, []);

  const isValid = (pattern, value, name) => {
    let result = false;
    if (pattern !== null && pattern !== undefined) {
      const patternObj = new RegExp(pattern);
      if (patternObj.test(value)) {
        debugger
        result = true;
      } else {
        debugger
        const newMessages = [...Errors];
        // if(value=="" || value==null || value==undefined)
        // {
        //   newMessages.push({[name]:"Please enter value"})
        // }else{
        //   // newMessages.push({[name]:"Please enter valid input value"})
        // }

        const IsErrorAvailable = newMessages.find((ErrorName) => {
          const keysname = Object.keys(ErrorName);

          if (ErrorName && keysname && keysname[0] == name) {
            return ErrorName
          }
        })

        if (IsErrorAvailable) {
          const indexError = Errors.indexOf(IsErrorAvailable);
          Errors[indexError][name] = "Please enter valid input value"
        } else {
          newMessages.push({ [name]: "Please enter value" })
        }
        console.log("newMessages ", newMessages)
        setErrors(newMessages)

        result = false;
      }
    }
    return result;
  };


  const ErrorMessage = (name) => {

    const namevalue = name?.name
    const findresult = Errors?.find(Item => Item[namevalue])
    console.log(" findresult name", findresult);
    // console.log(" findresult ",findresult[namevalue]);
    return (
      <>
        {findresult && findresult[namevalue] &&
          <p style={{ color: 'red' }}>
            {findresult[namevalue]}
          </p>
        }
      </>
    )
  }

  return (
    <Form
      style={{ padding: '18px' }}
      form={form}
      onFinish={(value) => {
        console.log("onFinish values ", value)

        setErrors([]);

        const checkPatternFound = formElements.some((ItemCheck) => ItemCheck.pattern)
        if (checkPatternFound) {

          let patterncountCompleted = 0;

          const AvailablePattern = formElements.filter((ItemCheck) => {

            if (ItemCheck.pattern) {
              const patternvalue = ItemCheck?.pattern ? ItemCheck?.pattern : '';
              const valuesfield = value[ItemCheck?.name] || '';
              const patternName = ItemCheck?.name ? ItemCheck?.name : '';

              console.log("patternvalue  ", ItemCheck)
              console.log("patternvalue  ", patternvalue)
              console.log("valuesfield  ", valuesfield)
              console.log("patternName  ", patternName)
              const result = isValid(patternvalue, valuesfield, patternName);
              if (result === true) {
                patterncountCompleted = patterncountCompleted + 1;
              }
              return ItemCheck
            }
          })


          if( AvailablePattern?.length===(patterncountCompleted))
          {
            submitHandler(value)
          }
          console.log("mAvailablePattern ", AvailablePattern.length);
          console.log("patterncountCompleted ", patterncountCompleted);

        } else {
          submitHandler(value)
        }
      }}
      onFinishFailed={cancelHandler}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      initialValues={{ remember: true }}
      layout="horizontal"
    >
      {grid ? (
        <div style={grid}>
          {formElements.map((item, index) => {
            const elements = {
              email: (
                <div>
                  <Input
                    labelName={item.labelName ? item.label : null}
                    type={item.type}
                    placeholder={item.labelName ? null : item.label}
                    iconClass={item.iconClass}
                    onChange={(e) => {
                      console.log();
                      form.setFieldValue({ [item.name]: e.target.value });
                    }}
                    style={item.style}
                    defaultValue={item.defaultValue ? item.defaultValue : ''}

                    // pattern={item?.pattern ? item?.pattern : null}
                    onBlur={() => {
                      if (item.pattern !== null && item.pattern !== undefined) {
                        isValid(item.pattern, form.getFieldValue(item.name), item.name);

                      }
                    }}
                  />
                  {

                    <ErrorMessage name={item.name} />
                  }
                </div>
              ),
              text: (
                <div>
                  <Input
                    onBlur={() => {
                      if (item.pattern !== null && item.pattern !== undefined) {
                        isValid(item.pattern, form.getFieldValue(item.name), item.name);

                      }
                    }}
                    labelName={item.labelName ? item.label : null}
                    type={item.type}
                    placeholder={item.labelName ? null : item.label}
                    iconClass={item.iconClass}
                    onChange={(e) => {
                      form.setFieldValue({ [item.name]: e.target.value });
                    }}
                    style={item.style}
                    defaultValue={item.defaultValue ? item.defaultValue : ''}
                  />
                  {

                    <ErrorMessage name={item.name} />
                  }
                </div>
              ),
              tel: (
                <div>
                  <Input
                    onBlur={() => {
                      if (item.pattern !== null && item.pattern !== undefined) {
                        isValid(item.pattern, form.getFieldValue(item.name), item.name);

                      }
                    }}

                    type={item.type}
                    placeholder={item.label}
                    iconClass={item.iconClass}
                    onChange={(e) => {
                      form.setFieldValue({ [item.name]: e.target.value });
                    }}
                  />

                  {

                    <ErrorMessage name={item.name} />
                  }

                </div>
              ),
              password: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                />
              ),
              confirmPassword: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),

              comment: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),
              number: (
                <InputNumber
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                />
              ),
              switch: <Switch />,
              date: <DatePicker />,

              description: (
                <>
                  {item.labelName && (
                    <div style={{ marginBottom: '2px', color: '#fff' }}>
                      <label>{item.label}</label>
                    </div>
                  )}
                  <TextArea
                    rows={4}
                    type={item.type}
                    placeholder={item.labelName ? null : item.label}
                    iconClass={item.iconClass}
                    onChange={(e) => {
                      form.setFieldValue({ [item.name]: e.target.value });
                    }}
                    style={item.style}
                  />
                </>
              ),
            };
            return (
              <Form.Item
                name={item.name}
                rules={item?.rules != undefined ? item.rules : []}
                messageVariables={cancelHandler}
                style={item.style}
                noStyle
              >
                {elements[item.type] || (
                  <>
                    {item.type === 'checkbox' && (
                      <Checkbox
                        onChange={(e) => {
                          form.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                      />
                    )}
                    {item.type === 'select' && (
                      <div>
                        {item.labelName ? (
                          <div style={{ marginBottom: '2px', color: '#fff' }}>
                            <label>{item.labelName ? item.label : null}</label>
                          </div>
                        ) : null}

                        {/* <Select
                      onChange={(value) => {
                        form.setFieldsValue({ [item.name]: value });
                      }}
                      options={item?.options != undefined ? item?.options : []}
                      style={item.style}
                    /> */}
                        <Dropdown
                          labelName={item.labelName ? item.label : null}
                          options={
                            item?.options != undefined ? item?.options : []
                          }
                          onSelect={(value) => {
                            form.setFieldsValue({ [item.name]: value });
                          }}
                          style={item.style}
                          placeholder={item.labelName ? null : item.label}
                          defaultValue={
                            item.defaultValue ? item.defaultValue : ''
                          }
                        />
                      </div>
                    )}
                    {item?.type === 'file' && (
                      <Document
                        setFile={setFileSysytem}
                        numberOfImage={item?.numberOfImage}
                        fileType={item?.fileType}
                        fileSize={item?.fileSize}
                        url={item?.url}
                        form={form}
                        name={item?.name}
                      />
                    )}
                  </>
                )}
              </Form.Item>
            );
          })}
        </div>
      ) : (
        <div>
          {' '}
          {formElements.map((item, index) => {
            const elements = {
              email: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                // required={item.required}
                />
              ),
              text: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),
              tel: (
                <Input
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                />
              ),
              password: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                />
              ),
              confirmPassword: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),

              comment: (
                <Input
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.labelName ? null : item.label}
                  iconClass={item.iconClass}
                  onChange={(e) => {
                    form.setFieldValue({ [item.name]: e.target.value });
                  }}
                  style={item.style}
                />
              ),
              number: (
                <InputNumber
                  labelName={item.labelName ? item.label : null}
                  type={item.type}
                  placeholder={item.label}
                  iconClass={item.iconClass}
                />
              ),
              switch: <Switch />,
              date: <DatePicker />,
              description: (
                <>
                  {item.labelName && (
                    <div style={{ marginBottom: '2px', color: '#fff' }}>
                      <label>{item.label}</label>
                    </div>
                  )}
                  <TextArea
                    rows={4}
                    type={item.type}
                    placeholder={item.labelName ? null : item.label}
                    iconClass={item.iconClass}
                    onChange={(e) => {
                      form.setFieldValue({ [item.name]: e.target.value });
                    }}
                    style={item.style}
                  />
                </>
              ),
            };
            return (
              <Form.Item
                name={item.name}
                rules={item?.rules != undefined ? item.rules : []}
                messageVariables={cancelHandler}
                style={item.style}
                noStyle
              >
                {elements[item.type] || (
                  <>
                    {item.type === 'checkbox' && (
                      <Checkbox
                        onChange={(e) => {
                          form.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                      />
                    )}
                    {item.type === 'select' && (
                      <div>
                        <div style={{ marginBottom: '2px', color: '#fff' }}>
                          <label>{item.label}</label>
                        </div>
                        {/* <Select
                      onChange={(value) => {
                        form.setFieldsValue({ [item.name]: value });
                      }}
                      options={item?.options != undefined ? item?.options : []}
                      style={item.style}
                    /> */}
                        <Dropdown
                          labelName={item.labelName ? item.label : null}
                          options={
                            item?.options != undefined ? item?.options : []
                          }
                          onSelect={(value) => {
                            form.setFieldsValue({ [item.name]: value });
                          }}
                          style={{ ...item.style }}
                          // style={item.style}
                          placeholder={item.labelName ? null : item.label}
                        />
                      </div>
                    )}
                    {item?.type === 'file' && (
                      <Document
                        setFile={setFileSysytem}
                        numberOfImage={item?.numberOfImage}
                        fileType={item?.fileType}
                        fileSize={item?.fileSize}
                        url={item?.url}
                        form={form}
                        name={item?.name}
                      />
                    )}
                  </>
                )}
              </Form.Item>
            );
          })}
        </div>
      )}

      <Form.Item noStyle wrapperCol={{ offset: 6, span: 18 }}>
        <div
          className="center"
          style={{
            gap: '2em',
            marginTop: '1em',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          {isSubmit && (
            <Button
              backgroundColor={submitButtonProperty.backgroundColor}
              name={submitButtonProperty.name}
              color={submitButtonProperty.color}
              buttonHandler={submitHandler}
              // buttonHandler={()=>{
              //   // console.log(" data is here ",FormData)
              // }}
              marginLeft={submitButtonProperty.marginLeft}
              marginTop={submitButtonProperty.marginTop}
              width={submitButtonProperty.width}
              height={submitButtonProperty.height}
              boxShadow={submitButtonProperty.boxShadow}
              borderRadius={submitButtonProperty.borderRadius}
              fontSize={submitButtonProperty.fontSize}
              buttonLoading={buttonLoading}
            />
          )}
          {isCancel && (
            <Button
              buttonProps={cancelButtonProperty}
              name={cancelButtonProperty.name}
              color={cancelButtonProperty.color}
              border={cancelButtonProperty.border}
              backgroundColor={cancelButtonProperty.backgroundColor}
              // backgroundColor={cancelButtonProperty.background}
              buttonHandler={submitHandler}
              width={cancelButtonProperty.width}
              height={cancelButtonProperty.height}
              boxShadow={cancelButtonProperty.boxShadow}
              borderRadius={cancelButtonProperty.borderRadius}
              fontSize={cancelButtonProperty.fontSize}
              // buttonHandler={cancelHandler}
              marginTop={cancelButtonProperty.marginTop}
            />
          )}
        </div>
      </Form.Item>
      {formType === 'signin' && (
        <>
          <Link
            to={'/recoverypassword'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'Black',
            }}
          >
            <p>
              <span>{/* <LockFilled /> */}</span>
              Forgot your password?
            </p>
          </Link>
        </>
      )}
    </Form>
  );
};

export default GeneralForm;
