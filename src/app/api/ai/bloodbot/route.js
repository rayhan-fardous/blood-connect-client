import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are BloodConnect AI ("রক্তবন্ধু"), a compassionate, highly knowledgeable medical blood donation assistant developed for the BloodConnect platform in Bangladesh.
You communicate fluently in both English and Bengali (বাংলা/Banglish) depending on the user's language.

Your core mission:
1. ELIGIBILITY SCREENING:
   - Age: 18 to 60 (up to 65 for healthy repeat donors).
   - Weight: At least 45 kg.
   - Donation Interval: Minimum 90 days (3 months) for men, 120 days (4 months) for women.
   - Hemoglobin: Minimum 12.5 g/dL.
   - Deferrals: Antibiotics/fever (wait 7-14 days after recovery), tattoo/piercing (wait 6 months), alcohol (wait 24 hours), pregnancy/lactation (temporary deferral).
   - Common myths: Donating blood does NOT cause permanent weakness, impotence, or weight loss. Plasma volume replenishes in 24-48 hours.

2. BLOOD COMPATIBILITY:
   - Universal RBC Donor: O Negative (O-)
   - Universal RBC Recipient: AB Positive (AB+)
   - O+ can donate to: O+, A+, B+, AB+
   - A+ can donate to: A+, AB+; receive from: A+, A-, O+, O-
   - B+ can donate to: B+, AB+; receive from: B+, B-, O+, O-
   - Always clarify Red Blood Cells vs Plasma if asked.

3. EMERGENCY ASSISTANCE:
   - When a user urgently needs blood, guide them to post a request on BloodConnect or search active requests by District/Upazila.
   - Remind them to contact hospital transfusion medicine departments and cross-match blood before transfusion.

Tone: Empathetic, concise, medically sound, encouraging. Use clear formatting with bullet points.
Always include a brief disclaimer: "Medical guidance provided by AI for informational purposes. Consult the hospital doctor or blood bank officer for final clearance."`;

function getClinicalFallbackResponse(lastMsg) {
  const query = (lastMsg || '').toLowerCase();
  if (
    query.includes('eligible') ||
    query.includes('যোগ্য') ||
    query.includes('শর্ত') ||
    query.includes('বয়স') ||
    query.includes('weight')
  ) {
    return `**Blood Donation Eligibility Criteria (WHO & DGHS Bangladesh Guidelines):**
- **Age:** 18 - 60 years (up to 65 for healthy repeat donors)
- **Weight:** Minimum 45 kg (48-50 kg preferred)
- **Interval:** Minimum 90 days (3 months) for men, 120 days (4 months) for women
- **Hemoglobin:** Minimum 12.5 g/dL
- **General Health:** Feeling well, no fever, flu, or recent antibiotic course (wait 14 days after recovery)
- **Deferrals:** Wait 6 months after tattoos/piercings; wait 24 hours after alcohol.

*Medical guidance provided for informational purposes. Consult the hospital doctor or blood bank officer for final clearance.*`;
  }

  if (
    query.includes('b+') ||
    query.includes('বি পজিটিভ')
  ) {
    return `**B+ (B Positive) Blood Compatibility:**
- **You can donate to:** **B+** and **AB+** patients.
- **You can receive from:** **B+**, **B-**, **O+**, and **O-** donors.

*Tip:* O- is the universal red blood cell donor, so in critical emergencies O- can also be given to B+ patients.`;
  }

  if (
    query.includes('o-') ||
    query.includes('ab+') ||
    query.includes('compatible') ||
    query.includes('গ্রুপ')
  ) {
    return `**Blood Group Compatibility Guide:**
- **O- (Universal RBC Donor):** Can donate red blood cells to all 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-).
- **AB+ (Universal RBC Recipient):** Can receive red blood cells from any blood group.
- **A+:** Can donate to A+, AB+; can receive from A+, A-, O+, O-.
- **O+:** Can donate to O+, A+, B+, AB+; can receive only from O+, O-.`;
  }

  if (
    query.includes('emergency') ||
    query.includes('জরুরি') ||
    query.includes('খুঁজব') ||
    query.includes('help')
  ) {
    return `🚨 **Emergency Blood Protocol:**
1. **Search Donors:** Use the [BloodConnect Search](/search-blood-request) page with **Smart Compatibility Mode** to find compatible donors nearby.
2. **Post Request:** Create an urgent request from your [Dashboard](/dashboard/create-request).
3. **Contact Hospital:** Inform the on-duty hospital blood bank or transfusion unit immediately for cross-matching.`;
  }

  return `Hello! I am **BloodConnect AI (রক্তবন্ধু)**. I am here to assist you with blood donation:
- Check your donor eligibility (age, weight, intervals, health)
- Biological blood compatibility (ABO & Rh matching)
- Emergency steps for finding blood donors in Bangladesh

How can I help you right now?`;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const lastUserMessage = messages[messages.length - 1]?.text || '';

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        reply: getClinicalFallbackResponse(lastUserMessage),
        isDemo: true,
      });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 800,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API transient issue (status ' + response.status + '):', errText);
      // Seamlessly fallback to clinical guidance
      return NextResponse.json({
        success: true,
        reply: getClinicalFallbackResponse(lastUserMessage),
        isFallback: true,
      });
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      getClinicalFallbackResponse(lastUserMessage);

    return NextResponse.json({
      success: true,
      reply: replyText,
    });
  } catch (error) {
    console.error('BloodBot Route Exception:', error);
    return NextResponse.json({
      success: true,
      reply: getClinicalFallbackResponse(''),
      isFallback: true,
    });
  }
}
