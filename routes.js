const checksum_lib = require('./checksum');
const port=5000;
module.exports=(app)=>{
app.get('/payment',(req,res)=>{
           let params={};
           params['MID']='YAWUVE89081883980894';
           params['WEBSITE']='WEBSTAGING';
           params['CHANNEL_ID']='WEB';
           params['INDUSTRY_TYPE_ID']='Retail';
           params['ORDER_ID']='ORD0001';
           params['CUST_ID']='CUST0001';
           params['TXN_AMOUNT']='100';
           params['CALLBACK_URL']="http://localhost:"+port+'/callback';
           params['EMAIL']='abc@gmail.com';
           params['MOBILE_NO']='9398268583';
           checksum_lib.genchecksum(params,'wfp3lUilnpe@zWIL',function(err,checksum){
            var txn_url = "https://securegw-stage.paytm.in/order/process"; 
            var form_fields = "";
            for(var x in params){
                form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
            }
form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";
res.writeHead(200, {'Content-Type': 'text/html'});
console.log(form_fields);
res.write('<html><head><title>Merchant Checkout Page</title>'+
'</head><body><center><h1>Please do not refresh this page...</h1>'+
'</center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form>'+
'<script type="text/javascript"> document.f1.submit(); </script></body></html>');
res.end();
});
});
}