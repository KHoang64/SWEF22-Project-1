using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering.PostProcessing;
using DG.Tweening;

public class BulletMovement : MonoBehaviour
{
    public float speed;
    Rigidbody rb;
    GameObject warpContainer;
    [SerializeField] private PostProcessVolume dashVolume;

    // Start is called before the first frame update
    void Start()
    {
        warpContainer = GameObject.Find("Warp Profile");
        rb = GetComponent<Rigidbody>();
        dashVolume = warpContainer.GetComponent<PostProcessVolume>();
    }

    // Update is called once per frame
    void Update()
    {
        transform.position += transform.forward * speed * Time.deltaTime;
    }


    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Enemy"))
        {
            BodyPartScript bp = collision.gameObject.GetComponent<BodyPartScript>();

            //if (!bp.enemy.dead)
                Instantiate(SuperHotScript.instance.hitParticlePrefab, transform.position, transform.rotation);

            bp.HidePartAndReplace();
            bp.enemy.Ragdoll();
            LeFlick();
            DestroyThisBox();
        }
        else
        {
            Destroy(gameObject);
        }
        
    }
    public void LeFlick()
    {
        //dashParticle.Play();

        //Sequence dash = DOTween.Sequence().Insert(0, transform.DOMove(transform.position + (transform.forward * 5), .2f))
        //.AppendCallback(() => dashParticle.Stop());
        //DOVirtual.Float(0, 1, .1f, SetDashVolumeWeight)
        //    .OnComplete(() => DOVirtual.Float(1, 0, .5f, SetDashVolumeWeight));
        DOVirtual.Float(0, 1, .1f, SetDashVolumeWeight)
            .OnComplete(() => DOVirtual.Float(1, 0, .5f, SetDashVolumeWeight));
    }
    void SetDashVolumeWeight(float weight)
    {
        dashVolume.weight = weight;
    }

    IEnumerator DestroyThisBox()
    {
        yield return new WaitForSeconds(2f);
        Destroy(gameObject);
    }
}
