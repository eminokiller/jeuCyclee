<?php
/**
 * Created by PhpStorm.
 * User: ubuntu
 * Date: 15/01/21
 * Time: 09:47
 */

namespace App\Service;

use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SerializerManager
{
    /**
     *
     * @var ClassMetadataFactory $classMetadataFactory
     */
    protected $classMetadataFactory;
    /**
     * @var ObjectNormalizer $objectNormalizer
     */
    protected $objectNormalizer;
    /**
     * @var Serializer $serializer
     */
    protected $serializer;

    /**
     * Serializer constructor.
     */
    public function __construct()
    {
        $this->classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $this->objectNormalizer = new ObjectNormalizer($this->classMetadataFactory);
        $this->serializer = new Serializer([new DateTimeNormalizer(), $this->objectNormalizer], [
            new JsonEncoder()
        ]);
    }

    /**
     * @return ObjectNormalizer
     */
    public function getObjectNormalizer(): ObjectNormalizer
    {
        return $this->objectNormalizer;
    }

    /**
     * @return Serializer
     */
    public function getSerializer(): Serializer
    {
        return $this->serializer;
    }

    public function normalize($instance, $groups = [])
    {
        return $this
            ->serializer
            ->normalize(
                $instance,
                'json',
                [AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => [$this, 'handleCircularReference'],
                    AbstractNormalizer::GROUPS => $groups]
            );
    }

    /**
     * @param $data
     * @param $className
     * @param array $defaults
     * @return mixed
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function denormalize($data, $className, $defaults = [])
    {
        return $this
            ->serializer
            ->denormalize(
                $data,
                $className,
                null,
                [AbstractNormalizer::DEFAULT_CONSTRUCTOR_ARGUMENTS => [
                    $defaults
                ]]
            );
    }

    /**
     * @param $object
     * @return null
     */
    public function handleCircularReference($object){
        if(method_exists($object,'getId')){
            return  $object->getId();
        }
        return  null;
    }


}