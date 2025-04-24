//normalizeImages.tsx

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

interface NormalizeImagesOptions {
  inputPath: string;
  outputDir: string;
  targetSize?: [number, number];
  targetDpi?: number;
  fileType?: "jpeg" | "png";
  namingPrefix?: string;
  metadata?: Record<string, string>;
}

async function normalizeImages({
  inputPath,
  outputDir,
  targetSize = [300, 300],
  targetDpi = 72,
  fileType = "jpeg",
  namingPrefix = "product",
  metadata = {},
}: NormalizeImagesOptions): Promise<string[]> {
  await fs.mkdir(outputDir, { recursive: true });

  const supportedTypes = ["jpeg", "png"];
  if (!supportedTypes.includes(fileType)) {
    throw new Error(`Unsupported file type: ${fileType}. Choose from ${supportedTypes}`);
  }

  const outputFiles: string[] = [];
  const input = path.resolve(inputPath);
  const files = (await fs.stat(input)).isFile()
    ? [input]
    : (await fs.readdir(input)).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)).map((f) => path.join(input, f));

  for (const [idx, file] of files.entries()) {
    try {
      const safePrefix = namingPrefix.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
      const outputFile = path.join(outputDir, `${safePrefix}-${idx + 1}.${fileType}`);

      await sharp(file)
        .resize({
          width: targetSize[0],
          height: targetSize[1],
          fit: "contain",
          background: { r: 255, g: 255, b: 255 },
        })
        .withMetadata({ density: targetDpi, ...metadata })
        [fileType]({ quality: fileType === "jpeg" ? 85 : undefined })
        .toFile(outputFile);

      outputFiles.push(outputFile);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  return outputFiles;
}

// Example usage
async function main() {
  const inputDir = "./input_images";
  const outputDir = "./normalized_images";
  const customMetadata = {
    Software: "Webstore Image Processor",
    Author: "xAI Team",
  };

  const files = await normalizeImages({
    inputPath: inputDir,
    outputDir,
    targetSize: [300, 300],
    targetDpi: 72,
    fileType: "jpeg",
    namingPrefix: "product-lcd-backpack",
    metadata: customMetadata,
  });

  console.log("Normalized images:", files);
}

main().catch(console.error);