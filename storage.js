// User management
export const saveUser = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Donation history
export const saveDonation = (donation) => {
  try {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
  } catch (error) {
    console.error('Error saving donation:', error);
  }
};

export const getDonations = () => {
  try {
    return JSON.parse(localStorage.getItem('donations')) || [];
  } catch (error) {
    console.error('Error getting donations:', error);
    return [];
  }
};