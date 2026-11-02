from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from .. import models, schemas, auth
from ..auth import get_current_user

router = APIRouter(prefix="/cv", tags=["cv"])

CV_PATH = Path("media/cv.pdf")
MAX_SIZE = 10 * 1024 * 1024  # 10 MB


@router.get("/")
def get_cv(download: bool = False):
    if not CV_PATH.exists():
        raise HTTPException(status_code=404, detail="No CV uploaded")

    return FileResponse(
        CV_PATH,
        media_type="application/pdf",
        filename="AJ_CV.pdf",
        content_disposition_type="attachment" if download else "inline",
        headers={"X-Robots-Tag": "noindex, nofollow"},
    )


@router.post("/")
async def upload_cv(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    contents = await file.read()

    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 10 MB)")

    if not contents.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="File is not a PDF")

    CV_PATH.parent.mkdir(parents=True, exist_ok=True)
    CV_PATH.write_bytes(contents)
    return {"message": "CV uploaded"}