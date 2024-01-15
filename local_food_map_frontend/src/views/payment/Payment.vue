<template>
    <div class="imp-container">
      <h1>결제 페이지</h1>
      <button type="submit" class="ant-btn ant-btn-primary ant-btn-lg" @click="handleSubmit">
        결제하기
      </button>
    </div>
  </template>
  
  <script>
 import Utils from '../../utils';

  export default {
    name: 'PaymentPage',
    data() {
      return {
        pg: 'html5_inicis',
        payMethod: 'card',
        escrow: false,
        vbankDue: '',
        bizNum: '',
        quota: '0',
        merchantUid: `mid_${new Date().getTime()}`,
        name: '아맛무-보증금 결제',
        amount: '20000',
        buyerName: '윤장원',
        buyerTel: '01012341234',
        buyerEmail: 'example@example.com',
      };
    },
    methods: {
      handleSubmit() {
        const { IMP } = window;
        IMP.init('imp21521582');
        const data = {
          pg: this.pg,
          pay_method: this.payMethod,
          escrow: this.escrow,
          merchant_uid: this.merchantUid,
          name: this.name, 
          amount: this.amount,
          buyer_name: this.buyerName,
          buyer_tel: this.buyerTel,
          buyer_email: this.buyerEmail,
          niceMobileV2: true,
        };
  
        if (this.payMethod === 'vbank') {
          data.vbank_due = this.vbankDue;
          if (this.pg === 'danal_tpay') {
            data.biz_num = this.bizNum;
          }
        }
        if (this.payMethod === 'card') {
          data.display = {
            card_quota: this.quota,
          };
        }
        IMP.request_pay(data, this.callback);
      },
      handlePg(pg) {
        const newMethods = Utils.getMethodsByPg(pg);
        const [{ value }] = newMethods;
  
        this.methods = Utils.getMethodsByPg(pg);
        this.form.setFieldsValue({
          payMethod: value,
        });
        this.setVisible(pg, value);
      },
      handleMethod(method) {
        const pg = this.form.getFieldValue('pg');
        this.setVisible(pg, method);
      },
      setVisible(pg, method) {
        // 가상계좌 입금기한 렌더링 여부
        const vbankDueVisible = method === 'vbank';
        this.vbankDueVisible = vbankDueVisible;
      },
      handleGoBack() {
        this.$router.push('/');
      },
      callback(response) {
        // 본인인증 종료 후 result 페이지로 이동
        const query = {
          ...response,
          type: 'payment',
        };
        this.$router.push({ path: '/result', query });
      },
    },
  };
  </script>
  
  