
<h3><a href="#">#{ID_HOOK} - {CUSTOMER_NAME_HOOK} - {STATUS_HOOK}</a></h3>
<div>
    <table class="order_details">
        <tr>
            <td class="tdHeader">Order Nr</td>
            <td>{ID_HOOK}</td>
            <td class="tdHeader">Order Date</td>
            <td>{ORDER_DATE_HOOK}</td>
        </tr>
        <tr>
            <td class="tdHeader">Customer</td>
            <td colspan="3"><a href="#" class="ViewCustomer" id="{CUSTOMER_ID_HOOK}">{CUSTOMER_NAME_HOOK}</a></td>
        </tr>
        <tr>
            <td class="tdHeader">Status</td>
            <td>{STATUS_HOOK}</td>
            <td class="tdHeader">Payment Gateway</td>
            <td>{PAYMENT_GATEWAY_HOOK}</td>
        </tr>
        <tr>
            <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
            <td class="trHeader" colspan="2">Product Description</td>
            <td class="trHeader">Quantity</td>
            <td class="trHeader">Unit Price</td>
        </tr>
        
        <tbody>
        {ORDER_DETAILS_HOOK}
        </tbody>
        
        <tr>
            <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
            <td class="tdHeader">Products Total:</td>
            <td class="amount">EUR {PRODUCTS_AMOUNT_HOOK}</td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
            <td class="tdHeader">Shipping Total:</td>
            <td class="amount">EUR {SHIPPING_AMOUNT_HOOK}</td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
            <td class="tdHeader">Total:</td>
            <td class="amount"><b>EUR {ORDER_AMOUNT_HOOK}</b></td>
        </tr>
    </table>
</div>