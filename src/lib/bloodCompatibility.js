// Blood compatibility matrices and clinical triage helpers

export const CAN_DONATE_TO = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export const CAN_RECEIVE_FROM = {
  'O-': ['O-'],
  'O+': ['O+', 'O-'],
  'A-': ['A-', 'O-'],
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal recipient
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/**
 * Returns list of patient blood groups a donor of bloodGroup can donate to.
 */
export function getCompatibleRecipientGroups(donorBloodGroup) {
  return CAN_DONATE_TO[donorBloodGroup] || [donorBloodGroup];
}

/**
 * Returns list of donor blood groups a recipient of bloodGroup can receive from.
 */
export function getCompatibleDonorGroups(recipientBloodGroup) {
  return CAN_RECEIVE_FROM[recipientBloodGroup] || [recipientBloodGroup];
}

/**
 * Checks if donor can donate to recipient
 */
export function isBiologicallyCompatible(donorGroup, recipientGroup) {
  if (!donorGroup || !recipientGroup) return false;
  const compatibleRecipients = CAN_DONATE_TO[donorGroup] || [];
  return compatibleRecipients.includes(recipientGroup);
}

/**
 * Computes urgency level based on donation date and time
 * Returns { level: 'critical' | 'high' | 'standard', hoursRemaining: number, label: string }
 */
export function calculateUrgency(donationDate, donationTime) {
  if (!donationDate) {
    return { level: 'standard', hoursRemaining: 999, label: 'Standard' };
  }

  try {
    const timeStr = donationTime || '23:59';
    const targetDateTime = new Date(`${donationDate}T${timeStr}:00`);
    
    // If invalid date, fallback
    if (isNaN(targetDateTime.getTime())) {
      return { level: 'standard', hoursRemaining: 999, label: 'Standard' };
    }

    const diffMs = targetDateTime.getTime() - Date.now();
    const hoursRemaining = Math.round(diffMs / (1000 * 60 * 60));

    if (hoursRemaining <= 6) {
      return {
        level: 'critical',
        hoursRemaining,
        label: hoursRemaining <= 0 ? 'Immediate / Past Due' : `${hoursRemaining}h remaining (Critical)`,
      };
    } else if (hoursRemaining <= 24) {
      return {
        level: 'high',
        hoursRemaining,
        label: `${hoursRemaining}h remaining (High Priority)`,
      };
    } else {
      const days = Math.round(hoursRemaining / 24);
      return {
        level: 'standard',
        hoursRemaining,
        label: `${days} day${days > 1 ? 's' : ''} left`,
      };
    }
  } catch {
    return { level: 'standard', hoursRemaining: 999, label: 'Standard' };
  }
}
