var App = App || {};

App.Templates = (function()
{
    /**
     * Return a transaction status template
     *
     * @param string status
     */
    function transactionStatus(status)
    {
        var statusTemplate = '';
        
        if(status) {
            statusTemplate = "<div class='transaction__status'>" + status + "</div>";
        }
        
        return statusTemplate;
    }
    
    
    
    
    
    /**
     * Return a sidebar heading template
     *
     * @param string heading
     */
    function sidebarHeading(heading)
    {
        return "<h2 class='h4 sidebar__heading'>" + heading + "</h2>";
    }
    
    
    
    
    
    /**
     * Return a merchant logo template
     *
     * @param object transaction
     */
    function merchantLogo(transaction)
    {        
        var merchantLogoTemplate = "<div class='transaction__logo'></div>";
        
        if(transaction.merchant && transaction.merchant.logo) {
            merchantLogoTemplate = "<div class='transaction__logo'><img src='" + transaction.merchant.logo + "' /></div>";
        }
        
        return merchantLogoTemplate;
    }

    
    

    
    /**
     * Return a transaction template
     *
     * @param object transaction
     * @param string transactionName
     * @param string status
     * @param string amount
     */
    function transation(transaction, transactionName, status, amount, balance)
    {
        var moneyOut = "";
        var moneyIn = "";
        var localCurrency = "";
        if(transaction.local_currency !== transaction.currency) {
            localCurrency = " (" + App.Helpers.formatCurrency(transaction.local_amount, transaction.local_currency, true) +")";
        }
        if(transaction.amount > 0) {
            moneyIn = amount;
        }
        else {
            moneyOut = amount + localCurrency;
        }
        
        // transaction classes
        var transactionClasses = "transaction";
        if(transaction.decline_reason) {
            transactionClasses += " transaction--declined";
        }
        
        transactionClasses += " category-" + transaction.category;
        
        var transactionTemplate = [
            "<div class='" + transactionClasses + "'>",
                "<div class='transaction__info'>",
                    "<div class='transaction__name'>" + transactionName + "</div>",
                    transactionStatus(status),
                "</div>",
                "<div class='transaction__amount'>" + moneyOut + "</div>",
                "<div class='transaction__amount transaction__amount--positive'>" + moneyIn + "</div>",
                "<div>" + balance + "</div>",
            "</div>"
        ].join("\n");
        
        return transactionTemplate;
    }
    
    
    
    
    /**
     * Return a merchant logo template
     *
     * @param string name
     * @param string date
     * @param string amount
     */
    function infoWindow(name, date, amount)
    {        
        var infoWindowTemplate = [
            "<div class='infoWindow'>",
                "<div class='infoWindow__name'>" + name + "</div>",
                "<div class='infoWindow__date'>" + date + "</div>",
                "<div class='infoWindow__amount'>" + amount + "</div>",
            "</div>"
        ].join("\n");
        
        return infoWindowTemplate;
    }
    
    
    
    
    
    /**
     * Functions available to the public
     */
    return {
        transactionStatus: transactionStatus,
        sidebarHeading: sidebarHeading,
        merchantLogo: merchantLogo,
        transation: transation,
        infoWindow: infoWindow
    };
})();
