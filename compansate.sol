//  SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0;

contract SLACompensation {
    
    address   payable manager; // address of the manager
    address payable serviceProvider; // address of the service provider
   // address public customer; // address of the customer
    uint public serviceCost; // cost of the service per hour
    uint public compensationRate; // compensation rate per hour of violation
    uint public totalFees; // total fees collected from the customers
    uint public totalCompensation; // total compensation amount to be refunded to the customers
  //  address[] public customers;
    struct Violation {
        address customer;
        uint time;
    }

    struct cust {
        address customer;
        uint time;
    }
    
    Violation[] public violations; // list of violations
    cust[] public customers; // list of customers
    
    mapping(address => uint) public userViolationTime; // SLA violation time per user
    mapping(address => uint) public userCompensation; // compensation amount per user
    
    constructor(address sp,uint _serviceCost, uint _compensationRate) {
        manager = payable(msg.sender); 
        serviceProvider = payable(sp); // set the service provider's address
        serviceCost = _serviceCost;
        compensationRate = _compensationRate;
    }
    
    //function payFees(uint violatn_time) external payable  {
        //require(msg.sender == serviceProvider, "Only the service provider can pay fees");
        //totalFees += msg.value;
       // customers.push(cust(msg.sender,violatn_time));
       // address payable d = payable(manager);
       // d.transfer(msg.value);
   // }


    function payFees(uint violatn_time)  public payable{
    //require(msg.sender == serviceProvider, "Only the service provider can pay fees");
    totalFees += msg.value;
    customers.push(cust(msg.sender,violatn_time));
    address payable d = payable(manager);
    d.transfer(msg.value);
}

    
    function recordViolation(uint index)  public payable{
        //require(msg.sender == manager, "Only the manager can record violations");
        address _customer=customers[index].customer;
        uint _violationTime = customers[index].time;
        require(customers[index].time > 0, "Violation time must be greater than zero");
        violations.push(Violation(_customer, _violationTime));
        userViolationTime[customers[index].customer] += customers[index].time;
    }
    
    function calculateCompensation(uint index)  public payable{

        address _customer = violations[index].customer;
        //require(msg.sender == manager, "Only the manager can calculate compensation");
        uint userCompensationAmount = userViolationTime[_customer] * compensationRate * serviceCost / 100;
        userCompensation[_customer] = userCompensationAmount;
        totalCompensation += userCompensationAmount;
        userViolationTime[_customer] = 0;
    }
    
    function refundCompensation(uint index)  public payable{
        address _customer = violations[index].customer;
       // require(msg.sender == manager, "Only the manager can refund compensation to customer");
        uint amount = userCompensation[_customer];
        userCompensation[_customer] = 0;
        totalCompensation -= amount;
       address payable r = payable(_customer);
       r .transfer(amount);
    }
    
    function payService()  public payable{
       // require(msg.sender == manager, "Only the manager can pay this fees to service provider");
        uint amount = totalFees - totalCompensation;
        totalFees = 0;
        address payable s = payable(serviceProvider);
        s.transfer(amount);
    }
    

     
}