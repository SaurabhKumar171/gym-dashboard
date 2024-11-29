const { Member } = require('../models/Member');
const { Subscription } = require('../models/Subscription');
const { PaymentHistory } = require('../models/PaymentHistory');

export const addNewMember = async (memberData, paymentData) => {
  try {
    // Step 1: Validate subscription exists or create one if necessary
    const subscription = await Subscription.findOne({
      where: { id: memberData.subscription_id }
    });

    if (!subscription) {
      throw new Error('Subscription not found.');
    }

    // Step 2: Add the new member
    const newMember = await Member.create({
      name: memberData.name,
      mobile: memberData.mobile,
      email: memberData.email,
      profile_picture: memberData.profile_picture,
      age: memberData.age,
      address: memberData.address,
      subscription_status: 'Active', // Set status to Active initially
      subscription_id: subscription.id,
      join_date: new Date(),
      start_date: memberData.start_date,
      end_date: memberData.end_date,
    });

    // Step 3: Create Payment History (if payment info is provided)
    if (paymentData) {
      const payment = await PaymentHistory.create({
        payment_date: paymentData.payment_date,
        amount_paid: paymentData.amount_paid,
        payment_method: paymentData.payment_method,
        transaction_id: paymentData.transaction_id,
        payment_status: paymentData.payment_status, // "Success", "Failed", or "Pending"
        member_id: newMember.id,
        subscription_id: subscription.id,
      });
    }

    return newMember; // Return the newly created member
  } catch (error) {
    console.error('Error adding new member:', error.message);
    throw error;
  }
}
