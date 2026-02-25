import { useEffect } from "react";

export function ContactForm() {
  useEffect(() => {
    // Re-initialize LeadStorm embed if script already loaded
    if ((window as any).leadstormFormEmbed) {
      (window as any).leadstormFormEmbed();
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <iframe
        src="https://portal.leadstorm.ai/widget/form/0v99ynFIIfl2j07tige0"
        style={{ width: "100%", height: "613px", border: "none", borderRadius: "3px" }}
        id="inline-0v99ynFIIfl2j07tige0"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Calendar form"
        data-height="613"
        data-layout-iframe-id="inline-0v99ynFIIfl2j07tige0"
        data-form-id="0v99ynFIIfl2j07tige0"
        title="Calendar form"
      />
    </div>
  );
}
