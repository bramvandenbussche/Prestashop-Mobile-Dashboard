
CustomersList = function (_list, _divId) {
    
    this.ListOfCustomers = _list.customers.customer;
    this.View = $("#" + _divId);
    root = this;
    
    var htmlCustomerTemplate = GetTemplateByName('Customer');
    var htmlCustomerListTemplate = GetTemplateByName('CustomerList');

    this.Constructor = function () {
        $(document).ready(function () {
            root.RenderView();
        });
    }
    
    this.RenderView = function() {
        
        // Status tonen
        SetStatus("loading");
        
        // Asynchroon functie starten om view aan te maken
        window.setTimeout(function() { root.RenderPartialView.apply(root); }, 100);
    }
    
    this.RenderPartialView = function(CustomerList) {
        // Alle klanten overlopen in de lijst
        // en elke klant renderen in html
        customers_html = '';
        for (i=0;i< this.ListOfCustomers.length; i++) {
            customers_html += this.RenderCustomerView(this.ListOfCustomers[i]);
        }
        
        customers_html = htmlCustomerListTemplate.replace(/{CUSTOMER_HOOK}/g, customers_html);
        
        // html renderen
        $(this.View).html(customers_html);
        
        // Accordeon activeren
        $("#customer_list").accordion({
            autoHeight: false,
            collapsible: true
        });
        
        // Status resetten
        SetStatus("none");
    }
    
    
    this.RenderCustomerView = function (customer) {
        var customer_html = htmlCustomerTemplate;
        
        customer_html = customer_html.replace(/{ID_HOOK}/g, customer.id);
        customer_html = customer_html.replace(/{NAME_HOOK}/g, customer.firstname + ' ' + customer.lastname);
        customer_html = customer_html.replace(/{EMAIL_HOOK}/g, customer.email);
        customer_html = customer_html.replace(/{UPDDATE_HOOK}/g, customer.date_upd);
        customer_html = customer_html.replace(/{GENDER_HOOK}/g, customer.id_gender == 1 ? "male" : "female");
        customer_html = customer_html.replace(/{DOB_HOOK}/g, customer.birthday);
        
        return customer_html;
    }
}