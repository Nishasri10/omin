export const syncOffline = async (req, res) => {
  const { actions } = req.body;
  const processed = actions?.length || 0;
  res.json({ success: true, message: `Processed ${processed} offline actions`, data: { processed } });
};
