import { useState, useEffect } from "react";
import { offeringService } from "./../services/offeringService";
import { useOfferingApi } from "./../api/offeringsApi";

export function useOfferings({ userId, offeringId } = {}) {
  const { fetchOfferings, fetchOfferingById, editOffering } = useOfferingApi();

  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOfferings = async () => {
      if (!userId && !offeringId) return;
      setLoading(true);

      try {
        let response;
        if (offeringId) {
          response = await fetchOfferingById(offeringId);
          setOfferings(response);
        } else {
          response = await fetchOfferings(userId);
          setOfferings(response);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadOfferings();
  }, [userId, offeringId]);

  const submitEdit = async (data, onSuccess) => {
    try {
      const formData = offeringService.toEditPayload(data);
      await editOffering(offeringId, formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    offerings,
    loading,
    error,
    submitEdit,
    toFormValues: offeringService.toFormValues,
  };
}
