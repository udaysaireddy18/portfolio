# /public/certificates

Drop certificate files here, then list them in `src/data/portfolio.ts`
→ `certifications`.

```
/public/certificates/aws-cloud-practitioner.png
/public/certificates/aws-cloud-practitioner.pdf
```

Then add the entry:

```ts
{
  id: "aws-cloud-practitioner",
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  category: "cloud",              // one of the ids in certificationCategories
  completionDate: "2025-03-18",   // or "2025-03", "2025", "March 2025"
  description: "Foundational cloud architecture, services and billing.",
  certificateImage: "/certificates/aws-cloud-practitioner.png",
  certificatePdf: "/certificates/aws-cloud-practitioner.pdf",
  verificationUrl: "https://...",
}
```

Notes

- `certificateImage` and `certificatePdf` are both optional. Supply
  either one to get a "View certificate" button; supply both to get
  Image / PDF tabs inside the viewer.
- `verificationUrl` is optional. Without it no "Verify" button renders.
  Only use a real verification page issued by the organization.
- Keep filenames lowercase with dashes so the paths work on GitHub
  Pages as well as locally.